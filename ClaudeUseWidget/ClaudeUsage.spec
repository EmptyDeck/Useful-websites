# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['widget.py'],
    pathex=[],
    binaries=[('C:\\Users\\DRS\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\winpty\\winpty.dll', 'winpty'), ('C:\\Users\\DRS\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\winpty\\winpty-agent.exe', 'winpty')],
    datas=[],
    hiddenimports=['winpty'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='ClaudeUsage',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
