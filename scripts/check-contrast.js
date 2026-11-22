#!/usr/bin/env node
/* reskin · verificador de contraste WCAG de tokens. Sin dependencias.
 * Uso:  node scripts/check-contrast.js                      (todos los estilos)
 *       node scripts/check-contrast.js assets/tokens/y2k.css (uno)
 * Sale con código 1 si algún par baja de AA.
 */
const fs = require("fs"), path = require("path");

function parseBlocks(css) {                       // devuelve [{sel, decls}] (aplana @media)
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = []; let i = 0;
  (function walk(end, ctx) {
    while (i < end) {
      const open = css.indexOf("{", i); if (open < 0 || open >= end) break;
      const head = css.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < end && depth) { if (css[j] === "{") depth++; else if (css[j] === "}") depth--; j++; }
      const body = css.slice(open + 1, j - 1);
      if (head.startsWith("@")) { if (!/reduced-motion/.test(head)) { const save = i; i = open + 1; walk(j - 1, head); i = j; } else i = j; }
      else { out.push({ sel: head.replace(/\s+/g, " "), body, ctx }); i = j; }
    }
  })(css.length, "");
  return out;
}
function decls(body) { const m = {}; body.replace(/(--[\w-]+)\s*:\s*([^;]+);/g, (_, k, v) => { m[k] = v.trim(); }); return m; }
function resolve(v, map, d = 0) { return d > 6 ? v : v.replace(/var\((--[\w-]+)(?:,\s*([^)]+))?\)/g, (_, k, f) => map[k] ? resolve(map[k], map, d + 1) : (f || "")); }
function parseColor(s) {
  s = (s || "").trim();
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) { let h = m[1]; if (h.length <= 4) h = h.split("").map(c => c + c).join(""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 }; }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);
  if (m) { let a = m[4] === undefined ? 1 : (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])); return { r: +m[1], g: +m[2], b: +m[3], a }; }
  return null;
}
const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

function check(file) {
  const css = fs.readFileSync(file, "utf8"), blocks = parseBlocks(css);
  const base = {}; blocks.filter(b => b.sel === ":root").forEach(b => Object.assign(base, decls(b.body)));
  const themes = [{ name: ":root (base)", map: base }];
  blocks.filter(b => b.sel !== ":root" && /--rs-(ink|bg|surface|accent)\b/.test(b.body) && !/^\.|^\[data-rs-/.test(b.sel))
    .forEach(b => themes.push({ name: b.sel + (b.ctx ? "  " + b.ctx : ""), map: Object.assign({}, base, decls(b.body)) }));
  let fails = 0, total = 0;
  console.log("\n" + path.basename(file));
  for (const t of themes) {
    const get = (k, bg) => { const raw = t.map[k]; if (!raw) return null; const c = parseColor(resolve(raw, t.map)); return c ? (c.a < 1 && bg ? over(c, bg) : c) : null; };
    const bg = get("--rs-bg"); if (!bg) continue;
    const surf = get("--rs-surface", bg) || bg, surf2 = get("--rs-surface-2", bg) || surf;
    const pairs = [
      ["ink / bg", get("--rs-ink", bg), bg, 4.5], ["ink / surface", get("--rs-ink", surf), surf, 4.5], ["ink / surface-2", get("--rs-ink", surf2), surf2, 4.5],
      ["ink-muted / bg", get("--rs-ink-muted", bg), bg, 4.5], ["ink-muted / surface", get("--rs-ink-muted", surf), surf, 4.5],
      ["accent-ink / accent", get("--rs-accent-ink"), get("--rs-accent", bg), 4.5],
      ["focus / bg (UI 3:1)", get("--rs-focus", bg), bg, 3], ["focus / surface (UI 3:1)", get("--rs-focus", surf), surf, 3],
      ["danger / surface (texto)", get("--rs-danger-text") || get("--rs-danger", surf), surf, 3],
      ["chart-axis / bg", get("--rs-chart-axis", bg) || get("--rs-ink-muted", bg), bg, 4.5],
    ];
    const txt = get("--rs-accent-text", bg); if (txt) pairs.push(["accent-text / bg", txt, bg, 4.5]); else pairs.push(["accent / bg (UI 3:1)", get("--rs-accent", bg), bg, 3]);
    const tt = get("--rs-tooltip-bg", bg); if (tt) pairs.push(["tooltip-ink / tooltip-bg", get("--rs-tooltip-ink", tt) || get("--rs-ink", tt), tt, 4.5]);
    for (let n = 1; n <= 5; n++) { const c = get("--rs-chart-" + n, bg); if (c) pairs.push(["chart-" + n + " / surface (gráfico 3:1)", c, surf, 3]); }
    console.log("  [" + t.name + "]");
    for (const [label, fg, back, min] of pairs) {
      if (!fg || !back) continue; total++;
      const r = ratio(fg, back), ok = r >= min; if (!ok) fails++;
      if (!ok || process.env.VERBOSE) console.log("    " + (ok ? "ok  " : "FAIL") + " " + label.padEnd(30) + r.toFixed(2) + ":1  (mín " + min + ")");
    }
  }
  console.log("  " + (fails ? "✗ " + fails + " fallos de " + total : "✓ " + total + " pares AA"));
  return fails;
}
const args = process.argv.slice(2);
const dir = path.join(__dirname, "..", "assets", "tokens");
const files = args.length ? args : fs.readdirSync(dir).filter(f => f.endsWith(".css")).map(f => path.join(dir, f));
process.exit(files.reduce((n, f) => n + check(f), 0) ? 1 : 0);
