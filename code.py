from __future__ import annotations

import queue
import re
import sys
import threading
import time
from dataclasses import dataclass
from typing import Optional


try:
    import tkinter as tk
    from tkinter import messagebox, ttk
except Exception as e:  # pragma: no cover
    raise SystemExit(f"Tkinter not available: {e}")


def _want_tui(argv: list[str]) -> bool:
    return "--tui" in argv


def _run_tui() -> int:
    # Keeps the previous arrow-key baby-stepping TUI in case you still want it.
    import babysteps_tui  # noqa: PLC0415

    return babysteps_tui.main()


try:
    import serial  # type: ignore
    from serial.tools import list_ports  # type: ignore
except Exception:  # pragma: no cover
    serial = None
    list_ports = None


TEMP_RE = re.compile(
    r"(?:^|\s)T:(?P<tcur>-?\d+(?:\.\d+)?)\s*/\s*(?P<ttar>-?\d+(?:\.\d+)?)"
    r"(?:.*?\sB:(?P<bcur>-?\d+(?:\.\d+)?)\s*/\s*(?P<btar>-?\d+(?:\.\d+)?))?",
    re.IGNORECASE,
)
POS_RE = re.compile(
    r"(?:^|\s)X:(?P<x>-?\d+(?:\.\d+)?)\s+Y:(?P<y>-?\d+(?:\.\d+)?)\s+Z:(?P<z>-?\d+(?:\.\d+)?)",
    re.IGNORECASE,
)


@dataclass
class PrinterSnapshot:
    connected: bool = False
    port: str = ""
    baud: int = 115200
    hotend: str = "—"
    bed: str = "—"
    pos: str = "—"
    last: str = ""


class PrinterController:
    def __init__(self, name: str) -> None:
        self.name = name
        self._ser: Optional["serial.Serial"] = None
        self._thread: Optional[threading.Thread] = None
        self._stop = threading.Event()
        self._rx: "queue.Queue[str]" = queue.Queue()
        self._tx: "queue.Queue[str]" = queue.Queue()
        self._awaiting_ok = False
        self._snapshot = PrinterSnapshot()
        self._lock = threading.Lock()
        self._last_status_poll = 0.0

    def snapshot(self) -> PrinterSnapshot:
        with self._lock:
            return PrinterSnapshot(**self._snapshot.__dict__)

    def is_connected(self) -> bool:
        return self._ser is not None

    def list_ports(self) -> list[str]:
        if list_ports is None:
            return []
        return [p.device for p in list_ports.comports()]

    def connect(self, port: str, baud: int) -> None:
        if serial is None:
            raise RuntimeError("pyserial not installed (pip install pyserial)")
        if self._ser is not None:
            return

        self._stop.clear()
        ser_obj = serial.Serial(port=port, baudrate=baud, timeout=0.1, write_timeout=1)
        self._ser = ser_obj

        with self._lock:
            self._snapshot.connected = True
            self._snapshot.port = port
            self._snapshot.baud = baud
            self._snapshot.last = "connected"

        self._thread = threading.Thread(target=self._io_loop, name=f"{self.name}-io", daemon=True)
        self._thread.start()

        # Identify firmware (Marlin usually responds with capabilities)
        self.enqueue("M115")

    def disconnect(self) -> None:
        if self._ser is None:
            return
        self._stop.set()
        try:
            self._ser.close()
        except Exception:
            pass
        self._ser = None
        self._awaiting_ok = False
        with self._lock:
            self._snapshot.connected = False
            self._snapshot.last = "disconnected"

    def enqueue(self, line: str) -> None:
        line = line.strip()
        if not line or line.startswith(";"):
            return
        self._tx.put(line)

    def enqueue_many(self, lines: list[str]) -> None:
        for ln in lines:
            self.enqueue(ln)

    def send_now(self, line: str) -> None:
        if self._ser is None:
            return
        try:
            self._ser.write((line.strip() + "\n").encode("ascii", errors="ignore"))
        except Exception:
            return

    def drain_rx(self, max_lines: int = 200) -> list[str]:
        out: list[str] = []
        for _ in range(max_lines):
            try:
                out.append(self._rx.get_nowait())
            except queue.Empty:
                break
        return out

    def request_status(self) -> None:
        now = time.time()
        if now - self._last_status_poll < 1.0:
            return
        self._last_status_poll = now
        self.enqueue_many(["M105", "M114"])

    def home_all(self) -> None:
        self.enqueue("G28")

    def motors_off(self) -> None:
        self.enqueue("M84")

    def emergency_stop(self) -> None:
        # M112 may not return "ok" reliably; send immediately.
        self.send_now("M112")
        self._rx.put("[sent] M112 (EMERGENCY STOP)")

    def set_hotend(self, temp_c: int) -> None:
        self.enqueue(f"M104 S{temp_c}")

    def set_bed(self, temp_c: int) -> None:
        self.enqueue(f"M140 S{temp_c}")

    def fan(self, speed_0_255: int) -> None:
        speed = max(0, min(255, speed_0_255))
        self.enqueue(f"M106 S{speed}")

    def fan_off(self) -> None:
        self.enqueue("M107")

    def jog(self, axis: str, delta_mm: float, feed: int = 3000) -> None:
        axis = axis.upper()
        if axis not in ("X", "Y", "Z"):
            return
        cmd = f"G1 {axis}{delta_mm} F{feed}"
        self.enqueue_many(["G91", cmd, "G90"])

    def _update_snapshot_from_line(self, line: str) -> None:
        with self._lock:
            self._snapshot.last = line

        m = TEMP_RE.search(line)
        if m:
            hotend = f"{m.group('tcur')}/{m.group('ttar')}"
            bed = self._snapshot.bed
            if m.group("bcur") and m.group("btar"):
                bed = f"{m.group('bcur')}/{m.group('btar')}"
            with self._lock:
                self._snapshot.hotend = hotend
                self._snapshot.bed = bed

        m2 = POS_RE.search(line)
        if m2:
            pos = f"X{m2.group('x')} Y{m2.group('y')} Z{m2.group('z')}"
            with self._lock:
                self._snapshot.pos = pos

    def _io_loop(self) -> None:
        assert self._ser is not None
        ser_obj = self._ser
        while not self._stop.is_set():
            # Read
            try:
                raw = ser_obj.readline()
            except Exception:
                self._rx.put("[error] read failed")
                break

            if raw:
                try:
                    line = raw.decode("utf-8", errors="replace").strip()
                except Exception:
                    line = str(raw).strip()
                if line:
                    self._rx.put(line)
                    self._update_snapshot_from_line(line)
                    if line.lower().startswith("ok") or line.lower() == "ok":
                        self._awaiting_ok = False

            # Write (one-at-a-time, wait for ok)
            if not self._awaiting_ok:
                try:
                    cmd = self._tx.get_nowait()
                except queue.Empty:
                    cmd = None
                if cmd:
                    try:
                        ser_obj.write((cmd + "\n").encode("ascii", errors="ignore"))
                        self._awaiting_ok = True
                    except Exception:
                        self._rx.put(f"[error] write failed: {cmd}")
                        break

        # Cleanup on exit
        try:
            ser_obj.close()
        except Exception:
            pass
        with self._lock:
            self._snapshot.connected = False
            self._snapshot.last = "connection closed"


class PrinterPanel(ttk.Frame):
    def __init__(self, master: tk.Misc, controller: PrinterController) -> None:
        super().__init__(master, padding=8)
        self.controller = controller

        self.port_var = tk.StringVar(value="")
        self.baud_var = tk.StringVar(value="115200")
        self.hotend_target_var = tk.StringVar(value="200")
        self.bed_target_var = tk.StringVar(value="60")
        self.jog_step_xy_var = tk.StringVar(value="10")
        self.jog_step_z_var = tk.StringVar(value="1")
        self.fan_var = tk.IntVar(value=0)
        self.gcode_var = tk.StringVar(value="")

        self._build()
        self.refresh_ports()

    def _build(self) -> None:
        title = ttk.Label(self, text=self.controller.name, font=("Segoe UI", 12, "bold"))
        title.grid(row=0, column=0, columnspan=6, sticky="w")

        ttk.Label(self, text="Port").grid(row=1, column=0, sticky="w")
        self.port_combo = ttk.Combobox(self, textvariable=self.port_var, width=16, state="readonly")
        self.port_combo.grid(row=1, column=1, sticky="we", padx=(4, 8))

        ttk.Label(self, text="Baud").grid(row=1, column=2, sticky="w")
        self.baud_combo = ttk.Combobox(
            self,
            textvariable=self.baud_var,
            width=10,
            state="readonly",
            values=("115200", "250000", "230400", "57600"),
        )
        self.baud_combo.grid(row=1, column=3, sticky="w", padx=(4, 8))

        self.connect_btn = ttk.Button(self, text="Connect", command=self._toggle_connect)
        self.connect_btn.grid(row=1, column=4, sticky="we")
        self.refresh_btn = ttk.Button(self, text="Refresh", command=self.refresh_ports)
        self.refresh_btn.grid(row=1, column=5, sticky="we", padx=(6, 0))

        self.status_lbl = ttk.Label(self, text="Status: —")
        self.status_lbl.grid(row=2, column=0, columnspan=6, sticky="w", pady=(6, 0))
        self.temp_lbl = ttk.Label(self, text="Temp: —")
        self.temp_lbl.grid(row=3, column=0, columnspan=6, sticky="w")
        self.pos_lbl = ttk.Label(self, text="Pos: —")
        self.pos_lbl.grid(row=4, column=0, columnspan=6, sticky="w")

        sep = ttk.Separator(self, orient="horizontal")
        sep.grid(row=5, column=0, columnspan=6, sticky="we", pady=8)

        ttk.Button(self, text="Home (G28)", command=self.controller.home_all).grid(row=6, column=0, sticky="we")
        ttk.Button(self, text="Motors off (M84)", command=self.controller.motors_off).grid(row=6, column=1, sticky="we", padx=4)
        ttk.Button(self, text="Fan off (M107)", command=self.controller.fan_off).grid(row=6, column=2, sticky="we", padx=4)
        ttk.Button(self, text="E-Stop (M112)", command=self._confirm_estop).grid(row=6, column=3, sticky="we")

        ttk.Label(self, text="Jog XY").grid(row=7, column=0, sticky="w", pady=(10, 0))
        ttk.Entry(self, textvariable=self.jog_step_xy_var, width=8).grid(row=7, column=1, sticky="w", pady=(10, 0))
        ttk.Label(self, text="mm").grid(row=7, column=2, sticky="w", pady=(10, 0))

        ttk.Label(self, text="Jog Z").grid(row=7, column=3, sticky="w", pady=(10, 0))
        ttk.Entry(self, textvariable=self.jog_step_z_var, width=8).grid(row=7, column=4, sticky="w", pady=(10, 0))
        ttk.Label(self, text="mm").grid(row=7, column=5, sticky="w", pady=(10, 0))

        ttk.Button(self, text="X-", command=lambda: self._jog("X", -1)).grid(row=8, column=0, sticky="we")
        ttk.Button(self, text="X+", command=lambda: self._jog("X", +1)).grid(row=8, column=1, sticky="we", padx=4)
        ttk.Button(self, text="Y-", command=lambda: self._jog("Y", -1)).grid(row=8, column=2, sticky="we", padx=4)
        ttk.Button(self, text="Y+", command=lambda: self._jog("Y", +1)).grid(row=8, column=3, sticky="we", padx=4)
        ttk.Button(self, text="Z-", command=lambda: self._jog("Z", -1)).grid(row=8, column=4, sticky="we", padx=4)
        ttk.Button(self, text="Z+", command=lambda: self._jog("Z", +1)).grid(row=8, column=5, sticky="we")

        ttk.Label(self, text="Hotend").grid(row=9, column=0, sticky="w", pady=(10, 0))
        ttk.Entry(self, textvariable=self.hotend_target_var, width=8).grid(row=9, column=1, sticky="w", pady=(10, 0))
        ttk.Button(self, text="Set (M104)", command=self._set_hotend).grid(row=9, column=2, sticky="we", padx=4, pady=(10, 0))

        ttk.Label(self, text="Bed").grid(row=9, column=3, sticky="w", pady=(10, 0))
        ttk.Entry(self, textvariable=self.bed_target_var, width=8).grid(row=9, column=4, sticky="w", pady=(10, 0))
        ttk.Button(self, text="Set (M140)", command=self._set_bed).grid(row=9, column=5, sticky="we", pady=(10, 0))

        ttk.Label(self, text="Fan").grid(row=10, column=0, sticky="w", pady=(10, 0))
        fan_scale = ttk.Scale(self, from_=0, to=255, variable=self.fan_var, command=self._fan_changed)
        fan_scale.grid(row=10, column=1, columnspan=5, sticky="we", pady=(10, 0))

        ttk.Label(self, text="G-code").grid(row=11, column=0, sticky="w", pady=(10, 0))
        gcode_entry = ttk.Entry(self, textvariable=self.gcode_var)
        gcode_entry.grid(row=11, column=1, columnspan=4, sticky="we", pady=(10, 0), padx=4)
        gcode_entry.bind("<Return>", lambda _e: self._send_gcode())
        ttk.Button(self, text="Send", command=self._send_gcode).grid(row=11, column=5, sticky="we", pady=(10, 0))

        self.log = tk.Text(self, height=10, wrap="none")
        self.log.grid(row=12, column=0, columnspan=6, sticky="nsew", pady=(10, 0))
        scroll = ttk.Scrollbar(self, orient="vertical", command=self.log.yview)
        scroll.grid(row=12, column=6, sticky="ns", pady=(10, 0))
        self.log.configure(yscrollcommand=scroll.set)

        for c in range(6):
            self.columnconfigure(c, weight=1 if c in (1, 4, 5) else 0)
        self.rowconfigure(12, weight=1)

    def refresh_ports(self) -> None:
        ports = self.controller.list_ports()
        self.port_combo["values"] = ports
        if not self.port_var.get() and ports:
            self.port_var.set(ports[0])

    def _toggle_connect(self) -> None:
        if self.controller.is_connected():
            self.controller.disconnect()
            self.connect_btn.configure(text="Connect")
            return

        port = self.port_var.get().strip()
        if not port:
            messagebox.showerror("Connect", "Select a serial port first.")
            return
        try:
            baud = int(self.baud_var.get())
        except ValueError:
            messagebox.showerror("Connect", "Invalid baud rate.")
            return

        try:
            self.controller.connect(port, baud)
        except Exception as e:
            messagebox.showerror("Connect failed", str(e))
            return
        self.connect_btn.configure(text="Disconnect")

    def _confirm_estop(self) -> None:
        if not self.controller.is_connected():
            return
        if messagebox.askyesno("Emergency Stop", f"Send M112 to {self.controller.name}?\nThis will stop immediately."):
            self.controller.emergency_stop()

    def _jog(self, axis: str, sign: int) -> None:
        if not self.controller.is_connected():
            return
        try:
            step = float(self.jog_step_z_var.get() if axis.upper() == "Z" else self.jog_step_xy_var.get())
        except ValueError:
            messagebox.showerror("Jog", "Invalid jog step.")
            return
        delta = sign * step
        feed = 300 if axis.upper() == "Z" else 3000
        self.controller.jog(axis, delta, feed=feed)

    def _set_hotend(self) -> None:
        if not self.controller.is_connected():
            return
        try:
            t = int(self.hotend_target_var.get())
        except ValueError:
            messagebox.showerror("Hotend", "Invalid temperature.")
            return
        self.controller.set_hotend(t)

    def _set_bed(self) -> None:
        if not self.controller.is_connected():
            return
        try:
            t = int(self.bed_target_var.get())
        except ValueError:
            messagebox.showerror("Bed", "Invalid temperature.")
            return
        self.controller.set_bed(t)

    def _fan_changed(self, _value: str) -> None:
        if not self.controller.is_connected():
            return
        self.controller.fan(int(self.fan_var.get()))

    def _send_gcode(self) -> None:
        if not self.controller.is_connected():
            return
        line = self.gcode_var.get().strip()
        if not line:
            return
        self.controller.enqueue(line)
        self.gcode_var.set("")

    def tick(self) -> None:
        snap = self.controller.snapshot()
        self.status_lbl.configure(
            text=f"Status: {'connected' if snap.connected else 'disconnected'}  ({snap.port or '—'} @ {snap.baud})"
        )
        self.temp_lbl.configure(text=f"Temp: Hotend {snap.hotend}  |  Bed {snap.bed}")
        self.pos_lbl.configure(text=f"Pos: {snap.pos}")

        if snap.connected:
            self.controller.request_status()

        lines = self.controller.drain_rx()
        if lines:
            self.log.insert("end", "\n".join(lines) + "\n")
            self.log.see("end")


class App(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("Dual Marlin USB Controller")
        self.geometry("1100x700")

        if serial is None:
            messagebox.showerror(
                "Missing dependency",
                "pyserial is required.\n\nInstall:\n  pip install pyserial",
            )

        self.p1 = PrinterController("Printer 1")
        self.p2 = PrinterController("Printer 2")

        paned = ttk.Panedwindow(self, orient="horizontal")
        paned.pack(fill="both", expand=True)

        self.panel1 = PrinterPanel(paned, self.p1)
        self.panel2 = PrinterPanel(paned, self.p2)
        paned.add(self.panel1, weight=1)
        paned.add(self.panel2, weight=1)

        self.protocol("WM_DELETE_WINDOW", self._on_close)
        self.after(200, self._tick)

    def _tick(self) -> None:
        try:
            self.panel1.tick()
            self.panel2.tick()
        finally:
            self.after(200, self._tick)

    def _on_close(self) -> None:
        try:
            self.p1.disconnect()
            self.p2.disconnect()
        finally:
            self.destroy()


def main(argv: list[str] | None = None) -> int:
    argv = sys.argv[1:] if argv is None else argv
    if _want_tui(argv):
        return _run_tui()

    app = App()
    app.mainloop()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

