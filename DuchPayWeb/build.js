// DutchPay 빌드 스크립트
// dist/js/*.jsx -> dist/js/*.js 로 미리 컴파일한다.
// 브라우저에서 Babel을 실시간으로 돌리지 않도록(속도), 이미 갖고 있는
// vendor/babel.min.js(standalone)를 node에서 로드해 JSX만 변환한다.
//
// 사용: node build.js            (변경된 것만 컴파일)
//       node build.js --force    (무조건 전부 컴파일)
//
// start_server.ps1 이 서버 시작 전에 자동으로 이 스크립트를 실행한다.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const JSDIR = path.join(ROOT, "dist", "js");
const BABEL = path.join(JSDIR, "vendor", "babel.min.js");

const TARGETS = [
  ["app.jsx", "app.js"],
  ["groups.jsx", "groups.js"],
];

const force = process.argv.includes("--force");

function log(msg) { console.log("[build] " + msg); }

// .jsx 가 .js 보다 새로우면(또는 .js 가 없으면) 다시 컴파일해야 한다.
function needsBuild(src, out) {
  if (force) return true;
  if (!fs.existsSync(out)) return true;
  try {
    return fs.statSync(src).mtimeMs > fs.statSync(out).mtimeMs;
  } catch {
    return true;
  }
}

function loadBabel() {
  const code = fs.readFileSync(BABEL, "utf8");
  const g = {};
  const sandbox = { console, setTimeout, clearTimeout };
  sandbox.window = g; sandbox.self = g; sandbox.global = g; sandbox.globalThis = g;
  sandbox.navigator = { userAgent: "node" };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: "babel.min.js" });
  if (!g.Babel) throw new Error("Babel 로드 실패 (vendor/babel.min.js)");
  return g.Babel;
}

function main() {
  const pending = TARGETS.filter(([s, o]) =>
    needsBuild(path.join(JSDIR, s), path.join(JSDIR, o))
  );

  if (pending.length === 0) {
    log("최신 상태 — 컴파일할 것 없음");
    return;
  }

  const Babel = loadBabel();
  for (const [srcName, outName] of pending) {
    const src = path.join(JSDIR, srcName);
    const out = path.join(JSDIR, outName);
    const code = fs.readFileSync(src, "utf8");
    const res = Babel.transform(code, {
      presets: ["react"],   // JSX만 변환, 최신 JS 문법은 그대로(모던 브라우저 대상)
      compact: true,
      comments: false,
      filename: src,
    });
    fs.writeFileSync(out, res.code, "utf8");
    log(`${srcName} -> ${outName} (${(Buffer.byteLength(res.code) / 1024).toFixed(0)} KB)`);
  }
  log("완료");
}

try {
  main();
} catch (e) {
  console.error("[build] 실패: " + e.message);
  process.exit(1);
}
