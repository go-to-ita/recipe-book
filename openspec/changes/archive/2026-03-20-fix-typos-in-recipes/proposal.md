## Why

Los datos en `db.json` tienen problemas de calidad: typos en nombres, contenido placeholder ("sisisisi"), pasos con numeración embebida, y unidades de medida pegadas al número (`500ml`, `200g`) mientras otras usan espacio (`1 taza`, `1 cucharadita`). Estos errores afectan la presentación y credibilidad del libro de recetas.

## What Changes

- **Recipe 52ba**: corregir nombre "Corundad" → "Corundas", reemplazar descripción "sisisisi" por una real, limpiar pasos (eliminar prefijos "1.1.-", "2.2.-", "3.3.-" y separar en pasos individuales claros)
- **Recipe 5335**: reemplazar el URL en `steps[0]` por un paso de preparación real; completar `ingredients` con los ingredientes mínimos de unas corundas
- **Unidades de medida**: estandarizar a formato `número + espacio + unidad` en los ingredientes donde aplique: `500ml` → `500 ml`, `200g` → `200 g`, `100g` → `100 g`, `1kg` → `1 kg`, `300g` → `300 g`, `500g` → `500 g`

**In scope:** correcciones de datos en `db.json` únicamente
**Out of scope:** agregar nuevas recetas, cambiar categorías, modificar código fuente

## Capabilities

### New Capabilities
_(ninguna)_

### Modified Capabilities
_(ninguna — son correcciones de datos, no cambios de comportamiento)_

## Impact

- **Archivo modificado**: `db.json` (único archivo afectado)
- Sin cambios en código fuente, componentes ni API slice
