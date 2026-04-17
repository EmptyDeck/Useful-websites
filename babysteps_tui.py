from __future__ import annotations

import json
import os
import queue
import shutil
import subprocess
import sys
import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable, Optional


CONFIG_PATH = Path(".babysteps.json")


@dataclass(frozen=True)
class Step:
    name: str
    cmd: str


@dataclass
class Config:
    title: str
    shell: str  # "powershell" | "cmd" | "bash" | "sh" | "auto"
    steps: list[Step]


def _is_windows() -> bool:
    return os.name == "nt"


def _default_shell() -> str:
    if _is_windows():
        return "powershell"
    return "sh"


def _default_config() -> Config:
    return Config(
        title="BabySteps",
        shell=_default_shell(),
        steps=[
            Step("git status", "git status"),
            Step("python version", "python -V"),
            Step("list files", "ls" if not _is_windows() else "Get-ChildItem"),
            Step("echo number {n}", "echo n={n}"),
        ],
    )


def _config_to_json(cfg: Config) -> dict[str, Any]:
    return {
        "title": cfg.title,
        "shell": cfg.shell,
        "steps": [{"name": s.name, "cmd": s.cmd} for s in cfg.steps],
    }


def _load_config(path: Path) -> Config:
    if not path.exists():
        cfg = _default_config()
        path.write_text(json.dumps(_config_to_json(cfg), ensure_ascii=False, indent=2), encoding="utf-8")
        return cfg

    raw = json.loads(path.read_text(encoding="utf-8"))
    title = str(raw.get("title") or "BabySteps")
    shell = str(raw.get("shell") or _default_shell()).lower()
    steps_raw = raw.get("steps")
    if not isinstance(steps_raw, list):
        raise ValueError("Invalid config: steps must be a list")
    steps: list[Step] = []
    for item in steps_raw:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name") or "").strip()
        cmd = str(item.get("cmd") or "").strip()
        if not name or not cmd:
            continue
        steps.append(Step(name=name, cmd=cmd))
    if not steps:
        raise ValueError("Invalid config: no valid steps")
    return Config(title=title, shell=shell, steps=steps)


class Ansi:
    @staticmethod
    def enable_windows_vt() -> None:
        if not _is_windows():
            return
        try:
            import ctypes  # noqa: PLC0415

            kernel32 = ctypes.windll.kernel32
            handle = kernel32.GetStdHandle(-11)  # STD_OUTPUT_HANDLE = -11
            mode = ctypes.c_uint32()
            if kernel32.GetConsoleMode(handle, ctypes.byref(mode)) == 0:
                return
            ENABLE_VIRTUAL_TERMINAL_PROCESSING = 0x0004
            new_mode = mode.value | ENABLE_VIRTUAL_TERMINAL_PROCESSING
            kernel32.SetConsoleMode(handle, new_mode)
        except Exception:
            return

    @staticmethod
    def alt_screen(on: bool) -> str:
        return "\x1b[?1049h" if on else "\x1b[?1049l"

    @staticmethod
    def clear() -> str:
        return "\x1b[2J\x1b[H"

    @staticmethod
    def hide_cursor(on: bool) -> str:
        return "\x1b[?25l" if on else "\x1b[?25h"

    @staticmethod
    def dim(s: str) -> str:
        return f"\x1b[2m{s}\x1b[0m"

    @staticmethod
    def invert(s: str) -> str:
        return f"\x1b[7m{s}\x1b[0m"

    @staticmethod
    def bold(s: str) -> str:
        return f"\x1b[1m{s}\x1b[0m"


class Keys:
    UP = "up"
    DOWN = "down"
    ENTER = "enter"
    ESC = "esc"
    BACKSPACE = "backspace"
    CTRL_C = "ctrl_c"
    CHAR = "char"


@dataclass(frozen=True)
class KeyEvent:
    kind: str
    ch: str | None = None


class KeyReader:
    def __enter__(self) -> "KeyReader":
        return self

    def __exit__(self, exc_type, exc, tb) -> None:  # noqa: ANN001
        return None

    def poll(self) -> Optional[KeyEvent]:
        raise NotImplementedError


class WindowsKeyReader(KeyReader):
    def __init__(self) -> None:
        import msvcrt  # noqa: PLC0415

        self._msvcrt = msvcrt

    def poll(self) -> Optional[KeyEvent]:
        if not self._msvcrt.kbhit():
            return None
        ch = self._msvcrt.getwch()

        if ch == "\x03":
            return KeyEvent(Keys.CTRL_C)
        if ch in ("\r", "\n"):
            return KeyEvent(Keys.ENTER)
        if ch == "\x1b":
            return KeyEvent(Keys.ESC)
        if ch in ("\x08", "\x7f"):
            return KeyEvent(Keys.BACKSPACE)

        if ch in ("\x00", "\xe0"):
            code = self._msvcrt.getwch()
            if code == "H":
                return KeyEvent(Keys.UP)
            if code == "P":
                return KeyEvent(Keys.DOWN)
            return None

        return KeyEvent(Keys.CHAR, ch)


class PosixKeyReader(KeyReader):
    def __init__(self) -> None:
        import termios  # noqa: PLC0415

        self._termios = termios
        self._fd = sys.stdin.fileno()
        self._orig = None

    def __enter__(self) -> "PosixKeyReader":
        import tty  # noqa: PLC0415

        self._orig = self._termios.tcgetattr(self._fd)
        tty.setraw(self._fd)
        return self

    def __exit__(self, exc_type, exc, tb) -> None:  # noqa: ANN001
        if self._orig is not None:
            self._termios.tcsetattr(self._fd, self._termios.TCSADRAIN, self._orig)

    def poll(self) -> Optional[KeyEvent]:
        import select  # noqa: PLC0415

        r, _, _ = select.select([sys.stdin], [], [], 0)
        if not r:
            return None
        ch = sys.stdin.read(1)
        if ch == "\x03":
            return KeyEvent(Keys.CTRL_C)
        if ch in ("\r", "\n"):
            return KeyEvent(Keys.ENTER)
        if ch == "\x1b":
            # Arrow keys: ESC [ A/B
            r2, _, _ = select.select([sys.stdin], [], [], 0.01)
            if not r2:
                return KeyEvent(Keys.ESC)
            ch2 = sys.stdin.read(1)
            if ch2 != "[":
                return KeyEvent(Keys.ESC)
            r3, _, _ = select.select([sys.stdin], [], [], 0.01)
            if not r3:
                return KeyEvent(Keys.ESC)
            ch3 = sys.stdin.read(1)
            if ch3 == "A":
                return KeyEvent(Keys.UP)
            if ch3 == "B":
                return KeyEvent(Keys.DOWN)
            return KeyEvent(Keys.ESC)
        if ch in ("\x08", "\x7f"):
            return KeyEvent(Keys.BACKSPACE)
        return KeyEvent(Keys.CHAR, ch)


def _make_key_reader() -> KeyReader:
    if _is_windows():
        return WindowsKeyReader()
    return PosixKeyReader()


class ProcRunner:
    def __init__(self, shell: str) -> None:
        self.shell = shell
        self.proc: subprocess.Popen[str] | None = None
        self._reader_thread: threading.Thread | None = None
        self._lines: "queue.Queue[str]" = queue.Queue()
        self._done = threading.Event()
        self.last_cmd: str | None = None

    def is_running(self) -> bool:
        return self.proc is not None and self.proc.poll() is None

    def pop_lines(self, max_items: int = 200) -> list[str]:
        lines: list[str] = []
        for _ in range(max_items):
            try:
                lines.append(self._lines.get_nowait())
            except queue.Empty:
                break
        return lines

    def _spawn(self, cmd: str) -> subprocess.Popen[str]:
        if self.shell in ("powershell", "pwsh"):
            exe = "powershell" if self.shell == "powershell" else "pwsh"
            return subprocess.Popen(
                [exe, "-NoProfile", "-Command", cmd],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
            )
        if self.shell == "cmd" and _is_windows():
            return subprocess.Popen(
                ["cmd", "/c", cmd],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
            )
        # sh/bash/auto fallback
        return subprocess.Popen(
            cmd,
            shell=True,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )

    def start(self, cmd: str) -> None:
        if self.is_running():
            raise RuntimeError("Process already running")
        self.last_cmd = cmd
        self._done.clear()
        self.proc = self._spawn(cmd)

        def _read() -> None:
            try:
                assert self.proc is not None
                stdout = self.proc.stdout
                if stdout is None:
                    return
                for line in stdout:
                    self._lines.put(line.rstrip("\n"))
            finally:
                self._done.set()

        self._reader_thread = threading.Thread(target=_read, name="proc-reader", daemon=True)
        self._reader_thread.start()

    def send(self, data: str) -> None:
        if not self.is_running():
            return
        assert self.proc is not None
        if self.proc.stdin is None:
            return
        try:
            self.proc.stdin.write(data)
            self.proc.stdin.flush()
        except Exception:
            return

    def terminate(self) -> None:
        if not self.is_running():
            return
        assert self.proc is not None
        try:
            self.proc.terminate()
        except Exception:
            pass

    def poll_exit(self) -> Optional[int]:
        if self.proc is None:
            return None
        return self.proc.poll()


def _truncate(s: str, width: int) -> str:
    if width <= 0:
        return ""
    if len(s) <= width:
        return s
    if width <= 1:
        return s[:width]
    return s[: width - 1] + "…"


def _draw(
    *,
    cfg: Config,
    steps: list[Step],
    selected: int,
    output_lines: list[str],
    status: str,
    input_hint: str,
    running_cmd: str | None,
) -> None:
    cols, rows = shutil.get_terminal_size((120, 30))

    header = f"{cfg.title}  {Ansi.dim('[↑/↓] select  [Enter] run  [n] set number  [q] quit')}"
    if running_cmd:
        header = f"{cfg.title}  {Ansi.dim('[Ctrl+C] stop  [digits+Enter] send')}"
    header = _truncate(header, cols)

    step_area_h = max(6, rows // 3)
    output_area_h = max(3, rows - (1 + 1 + step_area_h + 1 + 1))  # header + blank + steps + sep + status

    lines: list[str] = []
    lines.append(header)
    lines.append("")

    lines.append(Ansi.bold("Steps"))
    start = max(0, selected - (step_area_h // 2))
    end = min(len(steps), start + step_area_h)
    if end - start < step_area_h:
        start = max(0, end - step_area_h)

    for idx in range(start, end):
        prefix = f"{idx+1:>2}. "
        item = prefix + steps[idx].name
        item = _truncate(item, cols)
        if idx == selected:
            item = Ansi.invert(item.ljust(cols))
        lines.append(item)

    while len(lines) < 2 + 1 + step_area_h:  # keep layout stable
        lines.append("")

    lines.append("-" * cols)
    lines.append(Ansi.bold("Output"))

    view = output_lines[-output_area_h:]
    for ln in view:
        lines.append(_truncate(ln, cols))

    while len(lines) < rows - 1:
        lines.append("")

    status_line = status
    if input_hint:
        status_line = f"{status}   {Ansi.dim(input_hint)}"
    lines.append(_truncate(status_line, cols))

    sys.stdout.write(Ansi.clear())
    sys.stdout.write("\n".join(lines[:rows]))
    sys.stdout.flush()


def _format_cmd(step_cmd: str, n_value: Optional[int]) -> str:
    if "{n}" in step_cmd:
        return step_cmd.replace("{n}", "" if n_value is None else str(n_value))
    return step_cmd


def main() -> int:
    Ansi.enable_windows_vt()

    try:
        cfg = _load_config(CONFIG_PATH)
    except Exception as e:
        sys.stderr.write(f"Failed to load {CONFIG_PATH}: {e}\n")
        return 2

    steps = cfg.steps
    selected = 0
    output_lines: list[str] = []
    runner = ProcRunner(shell=cfg.shell if cfg.shell != "auto" else _default_shell())

    n_value: Optional[int] = None
    number_mode = False
    number_buf = ""

    status = "ready"
    input_hint = ""

    def log(s: str) -> None:
        output_lines.append(s)
        if len(output_lines) > 2000:
            del output_lines[:500]

    sys.stdout.write(Ansi.alt_screen(True))
    sys.stdout.write(Ansi.hide_cursor(True))
    sys.stdout.flush()

    try:
        with _make_key_reader() as keys:
            last_draw = 0.0
            while True:
                # Drain process output
                for ln in runner.pop_lines():
                    log(ln)

                exit_code = runner.poll_exit() if runner.proc else None
                if runner.proc and exit_code is not None and not runner.is_running():
                    if runner._done.is_set():
                        log(Ansi.dim(f"[exit {exit_code}]"))
                        runner.proc = None
                        status = "ready"

                now = time.time()
                if now - last_draw > 0.03:  # ~30fps max
                    if runner.is_running():
                        running_cmd = runner.last_cmd
                        status = f"running: {_truncate(running_cmd or '', 80)}"
                        input_hint = "type digits then Enter to send to process stdin"
                    else:
                        running_cmd = None
                        if number_mode:
                            status = f"set n: {number_buf}"
                            input_hint = "Enter=apply  Esc=cancel  Backspace=edit"
                        elif number_buf:
                            status = f"jump/run step #: {number_buf}"
                            input_hint = "Enter=run step  Esc=clear  Backspace=edit"
                        else:
                            n_txt = "unset" if n_value is None else str(n_value)
                            status = f"ready  (n={n_txt})"
                            input_hint = ""

                    _draw(
                        cfg=cfg,
                        steps=steps,
                        selected=selected,
                        output_lines=output_lines,
                        status=status,
                        input_hint=input_hint,
                        running_cmd=runner.last_cmd if runner.is_running() else None,
                    )
                    last_draw = now

                ev = keys.poll()
                if ev is None:
                    time.sleep(0.01)
                    continue

                if ev.kind in (Keys.CTRL_C,):
                    if runner.is_running():
                        runner.terminate()
                        log(Ansi.dim("[terminate]"))
                    else:
                        return 130
                    continue

                if runner.is_running():
                    if ev.kind == Keys.ENTER:
                        runner.send("\n")
                    elif ev.kind == Keys.CHAR and ev.ch is not None:
                        if ev.ch.isdigit():
                            runner.send(ev.ch)
                        elif ev.ch in ("-", "+", ".", " "):
                            runner.send(ev.ch)
                    continue

                if ev.kind == Keys.UP:
                    selected = (selected - 1) % len(steps)
                    continue
                if ev.kind == Keys.DOWN:
                    selected = (selected + 1) % len(steps)
                    continue
                if ev.kind == Keys.ESC:
                    number_mode = False
                    number_buf = ""
                    continue
                if ev.kind == Keys.BACKSPACE:
                    if number_buf:
                        number_buf = number_buf[:-1]
                    continue

                if ev.kind == Keys.CHAR and ev.ch is not None:
                    ch = ev.ch
                    if ch in ("q", "Q"):
                        return 0
                    if ch in ("n", "N"):
                        number_mode = True
                        number_buf = ""
                        continue
                    if ch.isdigit():
                        number_buf += ch
                        continue
                    if ch in ("r", "R") and runner.last_cmd:
                        cmd = runner.last_cmd
                        log(Ansi.dim(f"$ {cmd}"))
                        runner.start(cmd)
                        continue

                if ev.kind == Keys.ENTER:
                    if number_buf:
                        try:
                            value = int(number_buf)
                        except ValueError:
                            number_buf = ""
                            number_mode = False
                            continue
                        if number_mode:
                            n_value = value
                            log(Ansi.dim(f"[n={n_value}]"))
                            number_mode = False
                            number_buf = ""
                            continue
                        if 1 <= value <= len(steps):
                            selected = value - 1
                            number_buf = ""
                        else:
                            n_value = value
                            log(Ansi.dim(f"[n={n_value}]"))
                            number_buf = ""
                            continue

                    step = steps[selected]
                    cmd = _format_cmd(step.cmd, n_value)
                    log(Ansi.dim(f"$ {cmd}"))
                    try:
                        runner.start(cmd)
                    except Exception as e:
                        log(f"Failed to start: {e}")
                    continue

    finally:
        sys.stdout.write(Ansi.hide_cursor(False))
        sys.stdout.write(Ansi.alt_screen(False))
        sys.stdout.flush()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
