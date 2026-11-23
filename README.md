# reskin

Skill de Agent Skills que **rediseña por completo** un frontend que ya funciona, sin tocar su
lógica de negocio, y añade **funciones nuevas de diseño** (efectos, partículas, imágenes, piezas
decorativas). Detecta el stack, hace un brief de 5 preguntas (incluida la paleta y las funciones
nuevas), pide confirmación y aplica el estilo con los tokens y el sistema de estilos que el
proyecto ya usa.

## Instalación

```bash
npx skills add AlexCode-zz/reskin
```

El CLI pregunta si la instalas global o solo en el proyecto.

## Pruébalo

1. Instala la skill y abre la raíz de tu proyecto frontend.
2. Pide:

   ```
   Usa la skill reskin en este proyecto. Quiero un look liquid-glass.
   No cambies la lógica de negocio, textos ni rutas.
   ```

3. Confirma el stack que detecta y responde las preguntas con el selector.
4. Revisa el brief y elige "Aplicar".

Para más detalles, consulta `SKILL.md` dentro de la skill.
