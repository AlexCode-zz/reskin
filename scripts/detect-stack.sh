#!/usr/bin/env bash
# reskin · detect-stack.sh
# Detecta framework, capa de estilos, router (Next.js) y TypeScript.
# Solo bash/grep/find/sed. Sin dependencias. La skill funciona sin este script.
# Uso: ./scripts/detect-stack.sh [directorio]

set -euo pipefail

ROOT="${1:-.}"
PKG="$ROOT/package.json"

# --- helpers -------------------------------------------------------------

get_dep() {
  # $1 = nombre de la dependencia; imprime su versión (o nada)
  grep -oE "\"${1}\"[[:space:]]*:[[:space:]]*\"[^\"]+\"" "$PKG" 2>/dev/null \
    | head -n1 \
    | sed -E 's/^[^:]*:[[:space:]]*"([^"]*)".*$/\1/' \
    || true
}

css_has() {
  # $1 = patrón ERE; imprime el primer CSS que lo contiene
  find "$ROOT" -type f \( -name '*.css' -o -name '*.scss' \) \
    -not -path '*/node_modules/*' \
    -not -path '*/.next/*' \
    -not -path '*/dist/*' \
    -not -path '*/build/*' \
    -exec grep -lE "$1" {} + 2>/dev/null | head -n1
}

has_file() {
  # $1 = glob; imprime la primera coincidencia
  find "$ROOT" -type f -name "$1" \
    -not -path '*/node_modules/*' \
    -not -path '*/.next/*' \
    -not -path '*/dist/*' \
    -not -path '*/build/*' \
    2>/dev/null | head -n1
}

# --- dependencias --------------------------------------------------------

if [ -f "$PKG" ]; then
  NEXT="$(get_dep next)"
  REACT="$(get_dep react)"
  REACT_DOM="$(get_dep react-dom)"
  TW_POSTCSS="$(get_dep "@tailwindcss/postcss")"
  TW_VITE="$(get_dep "@tailwindcss/vite")"
  SOURCE="package-json"
else
  NEXT=""; REACT=""; REACT_DOM=""; TW_POSTCSS=""; TW_VITE=""
  SOURCE="filesystem"
fi

# --- framework -----------------------------------------------------------

FRAMEWORK="html-puro"
if [ -n "$NEXT" ]; then
  FRAMEWORK="nextjs"
elif [ -n "$REACT" ] || [ -n "$REACT_DOM" ]; then
  FRAMEWORK="react"
fi

# --- capa de estilos -----------------------------------------------------

TW4=""
if [ -n "$TW_POSTCSS" ] || [ -n "$TW_VITE" ]; then TW4=1; fi
if [ -n "$(css_has '@import[[:space:]]+["'\'']tailwindcss')" ]; then TW4=1; fi
if [ -n "$(css_has '@theme')" ]; then TW4=1; fi

TW3=""
for f in tailwind.config.js tailwind.config.ts tailwind.config.cjs tailwind.config.mjs; do
  if [ -f "$ROOT/$f" ]; then TW3=1; fi
done
if [ -n "$(css_has '@tailwind[[:space:]]+(base|components|utilities)')" ]; then TW3=1; fi

MODULES="$(has_file '*.module.css')"

if [ "$TW4" = "1" ]; then
  STYLING="tailwind-v4"
elif [ "$TW3" = "1" ]; then
  STYLING="tailwind-v3"
elif [ -n "$MODULES" ]; then
  STYLING="css-modules"
else
  STYLING="css-puro"
fi

# --- router (solo Next.js) ----------------------------------------------

ROUTER="none"
if [ "$FRAMEWORK" = "nextjs" ]; then
  HAS_APP=""
  HAS_PAGES=""
  if [ -d "$ROOT/app" ] || [ -d "$ROOT/src/app" ]; then HAS_APP=1; fi
  if [ -d "$ROOT/pages" ] || [ -d "$ROOT/src/pages" ]; then HAS_PAGES=1; fi
  if [ -n "$HAS_APP" ] && [ -n "$HAS_PAGES" ]; then
    ROUTER="mixed"
  elif [ -n "$HAS_APP" ]; then
    ROUTER="app"
  elif [ -n "$HAS_PAGES" ]; then
    ROUTER="pages"
  fi
fi

# --- TypeScript ----------------------------------------------------------

TYPESCRIPT="false"
if [ -f "$ROOT/tsconfig.json" ] || [ -n "$(has_file '*.tsx')" ]; then
  TYPESCRIPT="true"
fi

# --- salida --------------------------------------------------------------

cat <<EOF
{
  "framework": "$FRAMEWORK",
  "styling": "$STYLING",
  "router": "$ROUTER",
  "typescript": $TYPESCRIPT,
  "source": "$SOURCE"
}
EOF
