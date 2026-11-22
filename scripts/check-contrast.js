#!/usr/bin/env node
/**
 * reskin · check-contrast.js
 * Verifica contraste WCAG de un archivo de tokens (assets/tokens/*.css).
 * Sin dependencias: solo Node 14+.
 *
 * Uso:   node scripts/check-contrast.js assets/tokens/retro.css
 *        node scripts/check-contrast.js            (revisa los tres estilos)
 * Salida: tabla por tema; código de salida 1 si algo falla AA.
 *
 * Si no puedes ejecutarlo, calcula a mano con la fórmula WCAG o un verificador web.
 */
const fs = require("fs");
const path = require("path");

// --- color ---------------------------------------------------------------
function parseColor(v) {
  v = v.trim();
  let m = v.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
  }
  m = v.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  }
  return null;
}
const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
function lum({ r, g, b }) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// --- parseo de bloques de tokens (ignora @media / @supports) --------------
function parseBlocks(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blocks = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    const sel = css.slice(i, open).trim();
    let depth = 1, j = open + 1;
    while (j < css.length && depth) { if (css[j] === "{") depth++; else if (css[j] === "}") depth--; j++; }
    const body = css.slice(open + 1, j - 1);
    if (!sel.startsWith("@")) {
      const vars = {};
      body.replace(/(--[\w-]+)\s*:\s*([^;]+);/g, (_, k, v) => { vars[k] = v.trim().replace(/\s+/g, " "); });
      blocks.push({ sel, vars });
    }
    i = j;
  }
  return blocks;
}

const PAIRS = [
  // [texto, fondo, mínimo, etiqueta]
  ["--rs-ink", "--rs-bg", 4.5, "texto / fondo"],
  ["--rs-ink-muted", "--rs-bg", 4.5, "texto secundario / fondo"],
  ["--rs-accent", "--rs-bg", 4.5, "acento / fondo"],
  ["--rs-accent-ink", "--rs-accent", 4.5, "texto de botón / acento"],
  ["--rs-danger", "--rs-bg", 4.5, "peligro / fondo"],
  ["--rs-success", "--rs-bg", 4.5, "éxito / fondo"],
  ["--rs-warning", "--rs-bg", 4.5, "aviso / fondo"],
  ["--rs-ink", "--rs-tooltip-bg", 4.5, "texto / tooltip"],
  ["--rs-focus", "--rs-bg", 3, "foco / fondo (UI 3:1)"],
  ["--rs-chart-1", "--rs-bg", 4.5, "serie 1 / fondo (texto en badges 4.5:1)"],
  ["--rs-chart-2", "--rs-bg", 4.5, "serie 2 / fondo (texto en badges 4.5:1)"],
  ["--rs-chart-3", "--rs-bg", 4.5, "serie 3 / fondo (texto en badges 4.5:1)"],
  ["--rs-chart-4", "--rs-bg", 4.5, "serie 4 / fondo (texto en badges 4.5:1)"],
  ["--rs-chart-5", "--rs-bg", 4.5, "serie 5 / fondo (texto en badges 4.5:1)"],
];

function check(file) {
  const blocks = parseBlocks(fs.readFileSync(file, "utf8"));
  const base = blocks.find((b) => b.sel === ":root");
  if (!base) { console.log(`✗ ${file}: no hay bloque :root`); return false; }
  let ok = true;
  console.log(`\n${path.basename(file)}`);
  for (const b of blocks) {
    const vars = { ...base.vars, ...b.vars };
    const bg = parseColor(vars["--rs-bg"] || "");
    if (!bg) continue;
    console.log(`  ${b.sel === ":root" ? ":root (default)" : b.sel}`);
    for (const [fgVar, bgVar, min, label] of PAIRS) {
      if (!vars[fgVar]) continue;
      const bgc = parseColor(vars[bgVar] || "") || bg;
      const fg0 = parseColor(vars[fgVar]);
      if (!fg0) continue;
      const r = ratio(over(fg0, bgc), bgc);
      const pass = r >= min;
      if (!pass) ok = false;
      console.log(`    ${pass ? "✓" : "✗"} ${r.toFixed(1).padStart(5)}:1  (mín ${min})  ${label}`);
    }
  }
  return ok;
}

const here = path.join(__dirname, "..", "assets", "tokens");
const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(here).filter((f) => f.endsWith(".css")).map((f) => path.join(here, f));
const results = files.map(check);
console.log(results.every(Boolean) ? "\nTodo cumple WCAG AA." : "\nHay combinaciones por debajo de AA: ajusta los tokens marcados con ✗.");
process.exit(results.every(Boolean) ? 0 : 1);
