const fs = require('fs');
const html = fs.readFileSync('history.html', 'utf8');
const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
const ROWS = JSON.parse(fs.readFileSync('rows.json', 'utf8')).rows;
// stub the DOM bits so the whole script can be evaluated as-is
global.window = { addEventListener(){}, devicePixelRatio: 1 };
global.document = { getElementById: () => ({ innerHTML: '', textContent: '', onclick: null, onchange: null,
    clientWidth: 900, height: 300, style: {}, getContext: () => new Proxy({}, { get: () => () => {} }) }),
  querySelectorAll: () => [] };
global.fetch = async () => ({ json: async () => ({ rows: ROWS, pollSec: 600 }) });
global.setInterval = () => {}; global.setTimeout = () => {};
const captured = {};
global.document.getElementById = (id) => ({
  set innerHTML(v) { captured[id] = v; }, get innerHTML() { return captured[id] || ''; },
  set textContent(v) { captured[id] = v; }, get textContent() { return captured[id] || ''; },
  clientWidth: 900, height: 300, style: {}, getContext: () => new Proxy({}, { get: () => () => {} }),
});
eval(js);
ROWSGLOBAL = ROWS;
