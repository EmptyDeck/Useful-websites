#!/usr/bin/env python3
"""
NAS to NAS folder copy tool with resume, retry, and live progress UI.
Requires: pip install rich
"""

import sys
import time
import shutil
import hashlib
import argparse
import threading
import msvcrt
from pathlib import Path
from datetime import datetime, timedelta

from rich.console import Console
from rich.live import Live
from rich.panel import Panel
from rich.progress import (
    Progress, BarColumn, TextColumn, FileSizeColumn,
    TotalFileSizeColumn, TransferSpeedColumn, TimeElapsedColumn,
    TimeRemainingColumn, TaskProgressColumn,
)
from rich.table import Table
from rich.text import Text
from rich import box

# --- Config defaults ---
DEFAULT_RETRY = 3
DEFAULT_RETRY_DELAY = 5
DEFAULT_BUFFER_SIZE = 16 * 1024 * 1024  # 16 MB
DEFAULT_CHUNK_SIZE = 1 * 1024 * 1024    # 1 MB (hashing)

console = Console()

# 일시정지 상태 — P 키로 토글
pause_event = threading.Event()
pause_event.set()  # set = 실행 중, clear = 일시정지

def keyboard_listener():
    """백그라운드에서 P 키 감지해서 일시정지/재개 토글."""
    while True:
        if msvcrt.kbhit():
            key = msvcrt.getwch().lower()
            if key == "p":
                with stats_lock:
                    if pause_event.is_set():
                        pause_event.clear()
                        stats["pause_since"] = time.time()
                    else:
                        if stats["pause_since"] is not None:
                            stats["paused_time"] += time.time() - stats["pause_since"]
                            stats["pause_since"] = None
                        pause_event.set()
        time.sleep(0.05)

stats = {
    "total_files": 0,
    "copied": 0,
    "skipped": 0,
    "failed": 0,
    "total_bytes": 0,
    "copied_bytes": 0,
    "start_time": None,
    "paused_time": 0.0,   # 누적 일시정지 시간
    "pause_since": None,  # 현재 일시정지 시작 시각
    "failed_files": [],
    "current_file": "",
    "current_attempt": 1,
}
stats_lock = threading.Lock()


def format_size(n):
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} PB"


def format_duration(seconds):
    if seconds < 0:
        return "?"
    return str(timedelta(seconds=int(seconds)))


def md5_file(path):
    h = hashlib.md5()
    with open(to_long_path(path), "rb") as f:
        while chunk := f.read(DEFAULT_CHUNK_SIZE):
            h.update(chunk)
    return h.hexdigest()


def files_equal(src, dst, verify_hash):
    src_l, dst_l = to_long_path(src), to_long_path(dst)
    if not dst_l.exists():
        return False
    if src_l.stat().st_size != dst_l.stat().st_size:
        return False
    if verify_hash:
        return md5_file(src) == md5_file(dst)
    return abs(src_l.stat().st_mtime - dst_l.stat().st_mtime) < 2


def build_layout(file_prog: Progress, overall_prog: Progress) -> Table:
    now = time.time()
    paused_extra = (now - stats["pause_since"]) if stats["pause_since"] else 0
    elapsed = (now - stats["start_time"] - stats["paused_time"] - paused_extra) if stats["start_time"] else 0
    done = stats["copied"] + stats["skipped"] + stats["failed"]
    total = stats["total_files"]
    copied_bytes = stats["copied_bytes"]
    total_bytes = stats["total_bytes"]
    speed = copied_bytes / elapsed if elapsed > 0 else 0
    remaining_bytes = total_bytes - copied_bytes
    eta_sec = remaining_bytes / speed if speed > 0 else 0

    # Header info table
    info = Table.grid(padding=(0, 2))
    info.add_column(justify="left")
    info.add_column(justify="left")
    info.add_column(justify="left")
    info.add_column(justify="left")

    info.add_row(
        f"[bold cyan]파일[/]  [white]{done}[/]/[white]{total}[/]",
        f"[bold cyan]복사[/]  [green]{stats['copied']}[/]",
        f"[bold cyan]스킵[/]  [yellow]{stats['skipped']}[/]",
        f"[bold cyan]실패[/]  [red]{stats['failed']}[/]",
    )
    info.add_row(
        f"[bold cyan]데이터[/] {format_size(copied_bytes)}/{format_size(total_bytes)}",
        f"[bold cyan]속도[/]  {format_size(speed)}/s",
        f"[bold cyan]경과[/]  {format_duration(elapsed)}",
        f"[bold cyan]ETA[/]   {format_duration(eta_sec)}",
    )

    cur = stats["current_file"]
    if len(cur) > 70:
        cur = "…" + cur[-69:]
    attempt_txt = ""
    if stats["current_attempt"] > 1:
        attempt_txt = f"  [red](재시도 {stats['current_attempt']}회)[/]"

    layout = Table.grid(padding=(0, 0))
    layout.add_column()
    layout.add_row(info)
    layout.add_row("")
    layout.add_row(overall_prog)
    layout.add_row("")
    layout.add_row(file_prog)
    layout.add_row(Text(f"  {cur}{attempt_txt}", style="dim"))

    paused = not pause_event.is_set()
    title = "[bold yellow]⏸ 일시정지 (P키로 재개)[/]" if paused else "[bold]NAS Copy[/]"
    border = "yellow" if paused else "blue"
    return Panel(layout, title=title, border_style=border, box=box.ROUNDED)


def copy_file_bytes(src: Path, dst: Path, file_task, overall_task,
                    file_prog: Progress, overall_prog: Progress):
    src_l = to_long_path(src)
    dst_l = to_long_path(dst)
    total = src_l.stat().st_size
    dst_l.parent.mkdir(parents=True, exist_ok=True)
    tmp = Path(str(dst_l) + ".tmp_copy")

    file_prog.reset(file_task, total=total, completed=0)
    file_prog.update(file_task, description=f"[cyan]{src.name[:40]}")

    try:
        with open(src_l, "rb") as fsrc, open(tmp, "wb") as fdst:
            while chunk := fsrc.read(DEFAULT_BUFFER_SIZE):
                pause_event.wait()  # 일시정지 중이면 여기서 블로킹
                fdst.write(chunk)
                n = len(chunk)
                file_prog.advance(file_task, n)
                overall_prog.advance(overall_task, n)
                with stats_lock:
                    stats["copied_bytes"] += n
        tmp.replace(dst_l)
        shutil.copystat(src_l, dst_l)
    except Exception:
        if tmp.exists():
            tmp.unlink()
        raise


def copy_file(src: Path, dst: Path, verify_hash: bool, dry_run: bool,
              retries: int, retry_delay: int, overwrite: str,
              file_task, overall_task, file_prog, overall_prog,
              log_lines: list) -> str:
    src_l, dst_l = to_long_path(src), to_long_path(dst)
    if dst_l.exists():
        skip = False
        if overwrite == "never":
            skip = True
        elif overwrite == "if_newer":
            skip = src_l.stat().st_mtime <= dst_l.stat().st_mtime + 1
        elif overwrite == "if_different":
            skip = files_equal(src, dst, verify_hash)
        else:
            skip = False
        if skip:
            overall_prog.advance(overall_task, src_l.stat().st_size)
            with stats_lock:
                stats["copied_bytes"] += src_l.stat().st_size
            return "skipped"

    if dry_run:
        return "copied"

    for attempt in range(1, retries + 1):
        with stats_lock:
            stats["current_attempt"] = attempt
        try:
            copy_file_bytes(src, dst, file_task, overall_task, file_prog, overall_prog)
            if verify_hash:
                if md5_file(src) != md5_file(dst):
                    raise ValueError("MD5 불일치")
            return "copied"
        except Exception as e:
            if attempt < retries:
                ts = datetime.now().strftime("%H:%M:%S")
                log_lines.append(f"[{ts}] [yellow]RETRY {attempt}/{retries}[/] {src.name} — {e}")
                time.sleep(retry_delay)
            else:
                ts = datetime.now().strftime("%H:%M:%S")
                log_lines.append(f"[{ts}] [red]FAILED[/] {src} — {e}")
                return "failed"


def to_long_path(p: Path) -> Path:
    r"""UNC/로컬 경로에 \\?\ 접두사 적용. WebDAV 드라이브 문자는 그대로 반환."""
    s = str(p.resolve())
    if s.startswith("\\\\?\\"):
        return Path(s)
    # 드라이브 문자 경로 (예: D:\...) — WebDAV일 수 있으므로 접두사 없이 반환
    if len(s) >= 2 and s[1] == ":":
        return Path(s)
    if s.startswith("\\\\"):
        # UNC 경로: \\server\share → \\?\UNC\server\share
        return Path("\\\\?\\UNC\\" + s[2:])
    return Path(s)


def collect_files(src_root, include_ext, exclude_ext, min_size, max_size):
    files = []
    for p in src_root.rglob("*"):
        if not p.is_file():
            continue
        ext = p.suffix.lower()
        # .ini 항상 스킵
        if ext == ".ini":
            continue
        if include_ext and ext not in include_ext:
            continue
        if exclude_ext and ext in exclude_ext:
            continue
        size = p.stat().st_size
        if min_size is not None and size < min_size:
            continue
        if max_size is not None and size > max_size:
            continue
        files.append(p)
    return files


def main():
    parser = argparse.ArgumentParser(description="NAS-to-NAS 폴더 복사 (rich UI)")
    parser.add_argument("src", help="원본 폴더")
    parser.add_argument("dst", help="대상 폴더")
    parser.add_argument("--overwrite", choices=["always", "never", "if_newer", "if_different"],
                        default="if_different")
    parser.add_argument("--verify-hash", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--delete-extra", action="store_true")
    parser.add_argument("--retries", type=int, default=DEFAULT_RETRY)
    parser.add_argument("--retry-delay", type=int, default=DEFAULT_RETRY_DELAY)
    parser.add_argument("--include-ext", nargs="+", metavar="EXT")
    parser.add_argument("--exclude-ext", nargs="+", metavar="EXT")
    parser.add_argument("--min-size", type=int, metavar="BYTES")
    parser.add_argument("--max-size", type=int, metavar="BYTES")
    parser.add_argument("--log-file", metavar="PATH")
    args = parser.parse_args()

    src_root = Path(args.src)
    dst_root = Path(args.dst)

    if not src_root.exists():
        console.print(f"[red]ERROR: 원본 경로가 없습니다: {src_root}[/]")
        sys.exit(1)

    include_ext = {e if e.startswith(".") else f".{e}" for e in args.include_ext} if args.include_ext else None
    exclude_ext = {e if e.startswith(".") else f".{e}" for e in args.exclude_ext} if args.exclude_ext else None

    console.print(f"[bold]파일 목록 스캔 중...[/] {src_root}")
    files = collect_files(src_root, include_ext, exclude_ext, args.min_size, args.max_size)

    stats["total_files"] = len(files)
    stats["total_bytes"] = sum(f.stat().st_size for f in files)
    stats["start_time"] = time.time()

    console.print(f"[green]총 {stats['total_files']}개 파일 ({format_size(stats['total_bytes'])})[/]")
    if args.dry_run:
        console.print("[yellow]DRY RUN — 실제 복사 없음[/]")

    log_lines = []

    # Progress bars
    overall_prog = Progress(
        TextColumn("[bold blue]전체"),
        BarColumn(bar_width=40),
        TaskProgressColumn(),
        FileSizeColumn(),
        TextColumn("/"),
        TotalFileSizeColumn(),
        TransferSpeedColumn(),
        TimeElapsedColumn(),
        TextColumn("ETA"),
        TimeRemainingColumn(),
        console=console,
    )
    file_prog = Progress(
        TextColumn("  [cyan]현재"),
        BarColumn(bar_width=40),
        TaskProgressColumn(),
        FileSizeColumn(),
        TextColumn("/"),
        TotalFileSizeColumn(),
        TransferSpeedColumn(),
        console=console,
    )

    overall_task = overall_prog.add_task("전체", total=stats["total_bytes"])
    file_task = file_prog.add_task("현재 파일", total=1)

    log_fh = open(args.log_file, "a", encoding="utf-8") if args.log_file else None

    # 키보드 리스너 (P키 일시정지)
    t = threading.Thread(target=keyboard_listener, daemon=True)
    t.start()
    console.print("[dim]P 키: 일시정지/재개  |  Ctrl+C: 종료[/]")

    with Live(console=console, refresh_per_second=10, transient=False) as live:
        for src_file in files:
            pause_event.wait()  # 파일 시작 전에도 일시정지 체크
            rel = src_file.relative_to(src_root)
            dst_file = dst_root / rel

            with stats_lock:
                stats["current_file"] = str(rel)
                stats["current_attempt"] = 1

            live.update(build_layout(file_prog, overall_prog))

            result = copy_file(
                src_file, dst_file,
                verify_hash=args.verify_hash,
                dry_run=args.dry_run,
                retries=args.retries,
                retry_delay=args.retry_delay,
                overwrite=args.overwrite,
                file_task=file_task,
                overall_task=overall_task,
                file_prog=file_prog,
                overall_prog=overall_prog,
                log_lines=log_lines,
            )

            with stats_lock:
                if result == "copied":
                    stats["copied"] += 1
                elif result == "skipped":
                    stats["skipped"] += 1
                else:
                    stats["failed"] += 1
                    stats["failed_files"].append(str(src_file))

            live.update(build_layout(file_prog, overall_prog))

            if log_fh:
                ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                log_fh.write(f"[{ts}] [{result.upper()}] {rel}\n")
                log_fh.flush()

        # Final update
        with stats_lock:
            stats["current_file"] = "완료"
        live.update(build_layout(file_prog, overall_prog))

    # Print collected log lines (retries/failures)
    for line in log_lines:
        console.print(line)

    # Mirror mode
    if args.delete_extra and not args.dry_run:
        console.print("[yellow]대상에서 불필요한 파일 삭제 중...[/]")
        src_rel = {f.relative_to(src_root) for f in files}
        for dst_file in dst_root.rglob("*"):
            if not dst_file.is_file():
                continue
            rel = dst_file.relative_to(dst_root)
            if rel not in src_rel:
                console.print(f"  [red]삭제:[/] {rel}")
                dst_file.unlink()

    # Summary
    elapsed = time.time() - stats["start_time"]
    speed = stats["copied_bytes"] / elapsed if elapsed > 0 else 0
    console.rule("[bold green]완료[/]")
    console.print(f"  소요 시간  : {format_duration(elapsed)}")
    console.print(f"  파일       : 총 {stats['total_files']} | 복사 [green]{stats['copied']}[/] | 스킵 [yellow]{stats['skipped']}[/] | 실패 [red]{stats['failed']}[/]")
    console.print(f"  데이터     : {format_size(stats['copied_bytes'])}  (평균 {format_size(speed)}/s)")
    if stats["failed_files"]:
        console.print("[red]실패한 파일:[/]")
        for f in stats["failed_files"]:
            console.print(f"  {f}")

    if log_fh:
        log_fh.close()

    sys.exit(1 if stats["failed"] > 0 else 0)


if __name__ == "__main__":
    main()
