# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:/Users/DRS/AppData/Local/Temp/test2.py'],
    pathex=[],
    binaries=[('C:\\Users\\DRS/AppData/Local/Programs/Python/Python313/Lib/site-packages/winpty/winpty.dll', '.'), ('C:\\Users\\DRS/AppData/Local/Programs/Python/Python313/Lib/site-packages/winpty/conpty.dll', '.'), ('C:\\Users\\DRS/AppData/Local/Programs/Python/Python313/Lib/site-packages/winpty/winpty-agent.exe', '.'), ('C:\\Users\\DRS/AppData/Local/Programs/Python/Python313/Lib/site-packages/winpty/OpenConsole.exe', '.')],
    datas=[],
    hiddenimports=[],
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
    name='test2',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
