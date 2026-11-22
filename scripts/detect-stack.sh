#!/usr/bin/env bash
# reskin · detección de stack. Sin dependencias (bash + grep). Uso: bash scripts/detect-stack.sh [ruta]
set -u
root="${1:-.}"; pkg="$root/package.json"
has_dep() { [ -f "$pkg" ] && grep -Eq "\"$1\"[[:space:]]*:" "$pkg"; }
ver() { [ -f "$pkg" ] && grep -E "\"$1\"[[:space:]]*:" "$pkg" | head -1 | sed -E 's/.*:[[:space:]]*"[^0-9]*([0-9]+).*/\1/'; }

framework="html-puro"
if has_dep next; then framework="nextjs"; elif has_dep react; then framework="react"; fi

styling="css-puro"
if has_dep tailwindcss; then
  v="$(ver tailwindcss)"; if [ "${v:-0}" -ge 4 ] 2>/dev/null; then styling="tailwind-v4"; else styling="tailwind-v3"; fi
elif has_dep "@tailwindcss/vite" || has_dep "@tailwindcss/postcss"; then styling="tailwind-v4"
elif find "$root" -maxdepth 4 -name "*.module.css" -not -path "*/node_modules/*" 2>/dev/null | grep -q .; then styling="css-modules"; fi

router="-"
if [ "$framework" = "nextjs" ]; then
  if [ -d "$root/app" ] || [ -d "$root/src/app" ]; then router="app"; elif [ -d "$root/pages" ] || [ -d "$root/src/pages" ]; then router="pages"; fi
fi
ts="no"; { [ -f "$root/tsconfig.json" ] || has_dep typescript; } && ts="si"

anim="-"; for l in gsap framer-motion lenis tsparticles; do has_dep "$l" && anim="$anim $l"; done
css_entry="-"; for f in app/globals.css src/app/globals.css styles/globals.css src/index.css src/App.css src/styles.css index.css style.css styles.css; do [ -f "$root/$f" ] && { css_entry="$f"; break; }; done
js_entry="-"; for f in src/main.tsx src/main.jsx src/index.tsx src/index.js app/layout.tsx src/app/layout.tsx pages/_app.tsx pages/_app.js; do [ -f "$root/$f" ] && { js_entry="$f"; break; }; done
html_file="-"; for f in index.html public/index.html; do [ -f "$root/$f" ] && { html_file="$f"; break; }; done

echo "framework: $framework"
echo "styling: $styling"
echo "router: $router"
echo "typescript: $ts"
echo "css_entry: $css_entry"
echo "js_entry: $js_entry"
echo "html: $html_file"
echo "animation_libs: $anim"
