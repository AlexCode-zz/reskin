#!/usr/bin/env bash
# reskin · detect-stack.sh
# Detecta el stack frontend del proyecto actual (rápido, solo bash/grep/sed, sin deps).
# Opcional: la skill funciona leyendo los archivos a mano; este script es un atajo.
# Uso: ./scripts/detect-stack.sh [directorio]

set -euo pipefail

json_escape() { printf '%s' "$1" | tr -d '"'; }

ROOT="${1:-.}"
PKG="$ROOT/package.json"

get_dep() {
  # $1 = nombre de la dependencia; imprime su versión
  # (con `|| true` para tolerar dependencias ausentes)
  grep -oE "\"${1}\"[[:space:]]*:[[:space:]]*\"[^\"]+\"" "$PKG" 2>/dev/null \
    | head -n1 \
    | sed -E 's/^[^:]*:[[:space:]]*"([^"]*)".*$/\1/' \
    || true
}

if [ ! -f "$PKG" ]; then
  cat <<'EOF'
{
  "framework": "html-css",
  "uiLibrary": "none",
  "cssApproach": "plain-css",
  "router": "none",
  "source": "missing-package-json"
}
EOF
  exit 0
fi

NEXT="$(get_dep next)"
REACT="$(get_dep react)"
REACT_DOM="$(get_dep react-dom)"
TAILWIND="$(get_dep tailwindcss)"
TAILWIND_V4="$(get_dep "@tailwindcss/postcss")"
EMOTION="$(get_dep "@emotion/react")"
MUI="$(get_dep "@mui/material")"
CHAKRA="$(get_dep "@chakra-ui")"
MANTINE="$(get_dep "@mantine/core")"
STYLED="$(get_dep styled-components)"

FRAMEWORK="html-css"
if [ -n "$NEXT" ]; then
  FRAMEWORK="next"
elif [ -n "$REACT" ] || [ -n "$REACT_DOM" ]; then
  FRAMEWORK="react"
fi

UI_LIBRARY="none"
CSS_APPROACH="plain-css"
if [ -n "$TAILWIND_V4" ]; then
  UI_LIBRARY="tailwind"
  CSS_APPROACH="tailwind-v4"
elif [ -n "$TAILWIND" ]; then
  UI_LIBRARY="tailwind"
  CSS_APPROACH="tailwind-v3"
fi
if [ -n "$EMOTION" ]; then UI_LIBRARY="emotion"; fi
if [ -n "$MUI" ]; then UI_LIBRARY="mui"; fi
if [ -n "$CHAKRA" ]; then UI_LIBRARY="chakra"; fi
if [ -n "$MANTINE" ]; then UI_LIBRARY="mantine"; fi
if [ -n "$STYLED" ]; then UI_LIBRARY="styled-components"; fi

if [ -d "$ROOT/app" ]; then
  ROUTER="app"
elif [ -d "$ROOT/pages" ]; then
  ROUTER="pages"
else
  ROUTER="none"
fi

cat <<EOF
{
  "framework": "$(json_escape "$FRAMEWORK")",
  "uiLibrary": "$(json_escape "$UI_LIBRARY")",
  "cssApproach": "$(json_escape "$CSS_APPROACH")",
  "router": "$(json_escape "$ROUTER")",
  "source": "package-json"
}
EOF
