# NAS Copy Tool

NAS → NAS 폴더 복사 툴. 재시도, 재개(덮어쓰기 조건), 진행 표시 지원.

## 기본 사용법

```bash
python copy.py <원본폴더> <대상폴더>
```

## 옵션 요약

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `--overwrite` | `if_different` | `always` / `never` / `if_newer` / `if_different` |
| `--verify-hash` | 꺼짐 | 복사 후 MD5 검증 (느리지만 안전) |
| `--dry-run` | 꺼짐 | 실제 복사 없이 시뮬레이션 |
| `--delete-extra` | 꺼짐 | 원본에 없는 파일을 대상에서 삭제 (미러 모드) |
| `--retries` | `3` | 파일당 재시도 횟수 |
| `--retry-delay` | `5` | 재시도 대기 시간 (초) |
| `--include-ext` | 없음 | 이 확장자만 복사 (예: `.jpg .mp4`) |
| `--exclude-ext` | 없음 | 이 확장자는 건너뜀 |
| `--min-size` | 없음 | 최소 파일 크기 (바이트) |
| `--max-size` | 없음 | 최대 파일 크기 (바이트) |
| `--log-file` | 없음 | 로그를 파일에도 기록 |

## 예시

```bash
# 기본: 변경된 파일만 복사
python copy.py //NAS1/share/photos //NAS2/backup/photos

# 항상 덮어쓰기 + MD5 검증
python copy.py //NAS1/docs //NAS2/docs --overwrite always --verify-hash

# 재시도 10회, 10초 대기 (네트워크 불안정)
python copy.py //NAS1/video //NAS2/video --retries 10 --retry-delay 10

# 영상 파일만, 100MB 이상만
python copy.py //NAS1/raw //NAS2/raw --include-ext .mp4 .mkv .mov --min-size 104857600

# 미러 모드 (원본에 없는 파일 삭제)
python copy.py //NAS1/source //NAS2/mirror --delete-extra

# 테스트 실행 + 로그 파일
python copy.py //NAS1/data //NAS2/data --dry-run --log-file copy_log.txt
```

## 동작 방식

- 파일별로 `[###---] 45.2%  234 MB/1.2 GB  12.3 MB/s  ETA 0:01:23` 형태 진행 표시
- 복사 중 임시 파일(`.tmp_copy`)로 쓰고, 완료 후 rename → 중간 실패해도 대상 파일 손상 없음
- `if_different` 모드: 크기 동일 + mtime 2초 이내면 스킵
- 실패한 파일 목록은 완료 후 한 번에 출력
