const STORAGE_KEY = "vscode_clone_workspace_v1";

const dom = {
  appRoot: document.getElementById("appRoot"),
  tabBar: document.getElementById("tabBar"),
  editor: document.getElementById("editor"),
  lineNumbers: document.getElementById("lineNumbers"),
  minimap: document.getElementById("minimap"),
  sidebar: document.getElementById("sidebar"),
  sidebarTitle: document.getElementById("sidebarTitle"),
  sidebarContent: document.getElementById("sidebarContent"),
  statusFile: document.getElementById("statusFile"),
  statusDirty: document.getElementById("statusDirty"),
  cursorPos: document.getElementById("cursorPos"),
  charCount: document.getElementById("charCount"),
  fileType: document.getElementById("fileType"),
  commandPalette: document.getElementById("commandPalette"),
  paletteInput: document.getElementById("paletteInput"),
  paletteList: document.getElementById("paletteList"),
  fileOpenInput: document.getElementById("fileOpenInput"),
  toggleSidebarBtn: document.getElementById("toggleSidebarBtn"),
  activityBtns: [...document.querySelectorAll(".activity-btn")],
};

const initialFile = {
  id: crypto.randomUUID(),
  name: "welcome.md",
  language: "markdown",
  content: "# VS Code Clone\\n\\n- Ctrl+N: New file\\n- Ctrl+S: Save active file\\n- Ctrl+O: Open local file\\n- Ctrl+W: Close tab\\n- Ctrl+Shift+P: Command Palette\\n\\nStart editing now.",
  dirty: false,
  readonly: false,
};

const state = {
  files: [],
  activeFileId: null,
  explorerCollapsed: false,
  panel: "explorer",
  paletteOpen: false,
  paletteSelection: 0,
  currentSearchQuery: "",
};

const commands = [
  { id: "new", label: "File: New File", run: () => createFile() },
  { id: "save", label: "File: Save", run: () => saveActiveFile() },
  { id: "open", label: "File: Open File...", run: () => dom.fileOpenInput.click() },
  { id: "close", label: "File: Close Editor", run: () => closeActiveTab() },
  { id: "toggleSidebar", label: "View: Toggle Side Bar", run: () => toggleSidebar() },
  { id: "duplicate", label: "File: Duplicate Active File", run: () => duplicateActiveFile() },
  { id: "rename", label: "File: Rename Active File", run: () => renameActiveFile() },
  { id: "download", label: "File: Download Active File", run: () => downloadActiveFile() },
  { id: "theme", label: "Appearance: Toggle Accent", run: () => toggleAccent() },
  { id: "reset", label: "Workspace: Reset Demo Workspace", run: () => resetWorkspace() },
];

function detectLanguage(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "txt";
  const map = {
    js: "javascript",
    ts: "typescript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    py: "python",
    txt: "plaintext",
  };
  return map[ext] || "plaintext";
}

function getActiveFile() {
  return state.files.find((f) => f.id === state.activeFileId) || null;
}

function renderTabs() {
  dom.tabBar.innerHTML = "";
  state.files.forEach((file) => {
    const tab = document.createElement("div");
    tab.className = `tab ${file.id === state.activeFileId ? "active" : ""}`;
    tab.dataset.id = file.id;

    const name = document.createElement("span");
    name.textContent = file.dirty ? `${file.name} •` : file.name;

    const close = document.createElement("button");
    close.className = "close";
    close.type = "button";
    close.textContent = "×";
    close.title = "Close";
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(file.id);
    });

    tab.addEventListener("click", () => switchTab(file.id));
    tab.append(name, close);
    dom.tabBar.appendChild(tab);
  });
}

function renderEditor() {
  const file = getActiveFile();
  if (!file) {
    dom.editor.value = "";
    dom.editor.disabled = true;
    renderLineNumbers(1);
    updateStatus();
    return;
  }

  dom.editor.disabled = false;
  dom.editor.value = file.content;
  renderLineNumbers(getLineCount(file.content));
  updateMinimap(file.content);
  updateStatus();
}

function renderLineNumbers(lines) {
  const out = [];
  for (let i = 1; i <= Math.max(lines, 1); i += 1) out.push(String(i));
  dom.lineNumbers.textContent = out.join("\\n");
}

function updateMinimap(content) {
  const lines = content.split("\n").slice(0, 240).map((line) => line.slice(0, 22));
  dom.minimap.textContent = lines.join("\n");
}

function updateStatus() {
  const file = getActiveFile();
  if (!file) {
    dom.statusFile.textContent = "No file";
    dom.statusDirty.textContent = "";
    dom.charCount.textContent = "0 chars";
    dom.fileType.textContent = "Plain Text";
    return;
  }

  dom.statusFile.textContent = file.name;
  dom.statusDirty.textContent = file.dirty ? "Unsaved" : "Saved";
  dom.charCount.textContent = `${file.content.length} chars`;
  dom.fileType.textContent = file.language;
  refreshCursorInfo();
}

function refreshCursorInfo() {
  const pos = dom.editor.selectionStart || 0;
  const text = dom.editor.value.slice(0, pos);
  const lines = text.split("\n");
  const ln = lines.length;
  const col = lines[lines.length - 1].length + 1;
  dom.cursorPos.textContent = `Ln ${ln}, Col ${col}`;
}

function renderSidebar() {
  const panel = state.panel;
  dom.activityBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.panel === panel);
  });

  if (panel === "explorer") {
    dom.sidebarTitle.textContent = "EXPLORER";
    renderExplorerPanel();
  } else if (panel === "search") {
    dom.sidebarTitle.textContent = "SEARCH";
    renderSearchPanel();
  } else {
    dom.sidebarTitle.textContent = "SETTINGS";
    renderSettingsPanel();
  }
}

function renderExplorerPanel() {
  dom.sidebarContent.innerHTML = "";
  state.files.forEach((file) => {
    const item = document.createElement("div");
    item.className = `tree-item ${file.id === state.activeFileId ? "active" : ""}`;
    item.innerHTML = `<span>📄</span><span>${file.name}</span>${file.dirty ? '<span class="dirty-dot">●</span>' : ""}`;
    item.addEventListener("click", () => switchTab(file.id));
    dom.sidebarContent.appendChild(item);
  });
}

function renderSearchPanel() {
  const shell = document.createElement("div");
  shell.className = "search-box";

  const input = document.createElement("input");
  input.placeholder = "Search in open files";
  input.value = state.currentSearchQuery;

  const results = document.createElement("div");
  results.className = "search-results";

  const renderResults = () => {
    const q = input.value.trim().toLowerCase();
    state.currentSearchQuery = input.value;
    results.innerHTML = "";
    if (!q) return;

    state.files.forEach((file) => {
      const lines = file.content.split("\n");
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(q)) {
          const hit = document.createElement("div");
          hit.className = "search-hit";
          hit.textContent = `${file.name}:${idx + 1}  ${line.trim().slice(0, 90)}`;
          hit.addEventListener("click", () => {
            switchTab(file.id);
            focusLine(idx + 1, q);
          });
          results.appendChild(hit);
        }
      });
    });
  };

  input.addEventListener("input", renderResults);
  shell.append(input, results);
  dom.sidebarContent.replaceChildren(shell);
  renderResults();
}

function renderSettingsPanel() {
  const wrap = document.createElement("div");
  wrap.className = "search-box";
  wrap.innerHTML = `
    <div class="search-hit">Ctrl+Shift+P : Command Palette</div>
    <div class="search-hit">Ctrl+S : Save to browser workspace</div>
    <div class="search-hit">Alt+Click tab close icon : close quickly</div>
    <button class="ghost-btn" id="resetBtn" type="button">Reset Workspace</button>
  `;
  dom.sidebarContent.replaceChildren(wrap);
  const resetBtn = document.getElementById("resetBtn");
  resetBtn?.addEventListener("click", resetWorkspace);
}

function focusLine(targetLine, query) {
  const lines = dom.editor.value.split("\n");
  const lineStart = lines.slice(0, targetLine - 1).join("\n").length + (targetLine > 1 ? 1 : 0);
  const line = lines[targetLine - 1] || "";
  const start = line.toLowerCase().indexOf(query.toLowerCase());
  const selectionStart = lineStart + Math.max(start, 0);
  const selectionEnd = selectionStart + Math.max(query.length, 1);

  dom.editor.focus();
  dom.editor.setSelectionRange(selectionStart, selectionEnd);
  refreshCursorInfo();
}

function switchTab(id) {
  state.activeFileId = id;
  renderTabs();
  renderEditor();
  renderSidebar();
}

function closeTab(id) {
  const idx = state.files.findIndex((f) => f.id === id);
  if (idx === -1) return;

  const wasActive = state.activeFileId === id;
  state.files.splice(idx, 1);

  if (!state.files.length) {
    createFile("untitled.txt", "");
    return;
  }

  if (wasActive) {
    const next = state.files[Math.max(0, idx - 1)];
    state.activeFileId = next.id;
  }

  persistWorkspace();
  renderAll();
}

function closeActiveTab() {
  const active = getActiveFile();
  if (active) closeTab(active.id);
}

function createFile(name = null, content = "") {
  const suggested = `untitled-${state.files.length + 1}.txt`;
  const fileName = name || prompt("File name", suggested) || suggested;
  const file = {
    id: crypto.randomUUID(),
    name: fileName,
    language: detectLanguage(fileName),
    content,
    dirty: false,
    readonly: false,
  };

  state.files.push(file);
  state.activeFileId = file.id;
  persistWorkspace();
  renderAll();
}

function duplicateActiveFile() {
  const active = getActiveFile();
  if (!active) return;
  const [base, ext = "txt"] = active.name.split(/\.(?=[^.]+$)/);
  createFile(`${base}-copy.${ext}`, active.content);
}

function renameActiveFile() {
  const active = getActiveFile();
  if (!active) return;
  const next = prompt("Rename file", active.name);
  if (!next || next === active.name) return;

  active.name = next;
  active.language = detectLanguage(next);
  active.dirty = true;
  persistWorkspace();
  renderAll();
}

function saveActiveFile() {
  const active = getActiveFile();
  if (!active) return;
  active.dirty = false;
  persistWorkspace();
  updateStatus();
  renderTabs();
  renderSidebar();
}

function downloadActiveFile() {
  const active = getActiveFile();
  if (!active) return;

  const blob = new Blob([active.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = active.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toggleSidebar() {
  const hidden = dom.sidebar.classList.toggle("hidden");
  dom.appRoot.style.gridTemplateColumns = hidden
    ? window.innerWidth <= 760
      ? "44px 1fr"
      : "52px 1fr"
    : window.innerWidth <= 760
      ? "44px 1fr"
      : "52px 280px 1fr";
}

function toggleAccent() {
  const current = getComputedStyle(document.documentElement).getPropertyValue("--status").trim();
  const next = current === "#1664c0" ? "#007a62" : "#1664c0";
  document.documentElement.style.setProperty("--status", next);
}

function resetWorkspace() {
  if (!confirm("Reset all files in this workspace?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state.files = [structuredClone(initialFile)];
  state.activeFileId = state.files[0].id;
  persistWorkspace();
  renderAll();
}

function persistWorkspace() {
  const payload = {
    files: state.files,
    activeFileId: state.activeFileId,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadWorkspace() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.files = [structuredClone(initialFile)];
    state.activeFileId = state.files[0].id;
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.files = Array.isArray(parsed.files) && parsed.files.length ? parsed.files : [structuredClone(initialFile)];
    state.activeFileId = parsed.activeFileId || state.files[0].id;
  } catch {
    state.files = [structuredClone(initialFile)];
    state.activeFileId = state.files[0].id;
  }
}

function openPalette() {
  state.paletteOpen = true;
  state.paletteSelection = 0;
  dom.commandPalette.classList.remove("hidden");
  dom.commandPalette.setAttribute("aria-hidden", "false");
  dom.paletteInput.value = "";
  renderPaletteList("");
  setTimeout(() => dom.paletteInput.focus(), 0);
}

function closePalette() {
  state.paletteOpen = false;
  dom.commandPalette.classList.add("hidden");
  dom.commandPalette.setAttribute("aria-hidden", "true");
}

function renderPaletteList(query) {
  const q = query.trim().toLowerCase();
  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q));
  dom.paletteList.innerHTML = "";

  if (!filtered.length) {
    const li = document.createElement("li");
    li.textContent = "No commands found";
    dom.paletteList.appendChild(li);
    return;
  }

  filtered.forEach((cmd, idx) => {
    const li = document.createElement("li");
    li.textContent = cmd.label;
    li.classList.toggle("active", idx === state.paletteSelection);
    li.addEventListener("click", () => {
      cmd.run();
      closePalette();
    });
    dom.paletteList.appendChild(li);
  });
}

function runPaletteSelection() {
  const q = dom.paletteInput.value.trim().toLowerCase();
  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q));
  const picked = filtered[state.paletteSelection];
  if (!picked) return;
  picked.run();
  closePalette();
}

function getLineCount(content) {
  return content ? content.split("\n").length : 1;
}

function renderAll() {
  renderTabs();
  renderEditor();
  renderSidebar();
}

function wireEvents() {
  dom.editor.addEventListener("input", () => {
    const file = getActiveFile();
    if (!file) return;

    file.content = dom.editor.value;
    file.dirty = true;
    renderLineNumbers(getLineCount(file.content));
    updateMinimap(file.content);
    updateStatus();
    renderTabs();
    renderSidebar();
    persistWorkspace();
  });

  dom.editor.addEventListener("scroll", () => {
    dom.lineNumbers.scrollTop = dom.editor.scrollTop;
  });

  dom.editor.addEventListener("click", refreshCursorInfo);
  dom.editor.addEventListener("keyup", refreshCursorInfo);

  dom.toggleSidebarBtn.addEventListener("click", toggleSidebar);

  dom.activityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.panel = btn.dataset.panel;
      renderSidebar();
    });
  });

  dom.fileOpenInput.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    const text = await file.text();
    createFile(file.name, text);
    event.target.value = "";
  });

  window.addEventListener("keydown", (event) => {
    const isMac = navigator.platform.toLowerCase().includes("mac");
    const mod = isMac ? event.metaKey : event.ctrlKey;

    if (mod && event.shiftKey && event.key.toLowerCase() === "p") {
      event.preventDefault();
      if (state.paletteOpen) closePalette(); else openPalette();
      return;
    }

    if (state.paletteOpen) {
      if (event.key === "Escape") {
        closePalette();
      } else if (event.key === "ArrowDown") {
        state.paletteSelection += 1;
        renderPaletteList(dom.paletteInput.value);
      } else if (event.key === "ArrowUp") {
        state.paletteSelection = Math.max(0, state.paletteSelection - 1);
        renderPaletteList(dom.paletteInput.value);
      } else if (event.key === "Enter") {
        runPaletteSelection();
      }
      return;
    }

    if (mod && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveActiveFile();
      return;
    }

    if (mod && event.key.toLowerCase() === "n") {
      event.preventDefault();
      createFile();
      return;
    }

    if (mod && event.key.toLowerCase() === "o") {
      event.preventDefault();
      dom.fileOpenInput.click();
      return;
    }

    if (mod && event.key.toLowerCase() === "w") {
      event.preventDefault();
      closeActiveTab();
    }
  });

  dom.paletteInput.addEventListener("input", () => {
    state.paletteSelection = 0;
    renderPaletteList(dom.paletteInput.value);
  });

  dom.commandPalette.addEventListener("click", (event) => {
    if (event.target === dom.commandPalette) closePalette();
  });

  window.addEventListener("resize", () => {
    if (!dom.sidebar.classList.contains("hidden")) {
      dom.appRoot.style.gridTemplateColumns = window.innerWidth <= 760
        ? "44px 1fr"
        : "52px 280px 1fr";
    }
  });
}

function init() {
  loadWorkspace();
  wireEvents();
  renderAll();
}

init();
