# Pre-Implementation Review

## Security

- [x] El enlace `https://wa.me/?text=...` usa `encodeURIComponent` para sanitizar el texto del mensaje — evita inyección de caracteres especiales en la URL
- [x] No se envía información sensible: solo nombre, categoría y URL pública de la receta
- [x] El botón abre una URL externa en nueva pestaña (`target="_blank"`) — usar `rel="noopener noreferrer"` para evitar tabnapping
- [x] Sin llamadas a APIs externas ni tracking de terceros

## Performance

- [x] El enlace se construye en tiempo de clic (no en render) — sin impacto en el tiempo de carga de la página
- [x] Sin dependencias nuevas — cero impacto en el bundle size
- [x] Sin re-renders adicionales — el botón es estático, no tiene estado propio

## Accessibility

- [x] El botón debe tener texto visible ("Compartir por WhatsApp") o `aria-label` descriptivo si solo muestra ícono
- [x] Usar elemento `<a>` con `href` (en lugar de `<button>` con `onClick`) para preservar el comportamiento nativo de los enlaces (clic derecho, abrir en nueva pestaña, etc.)
- [x] El color del botón debe cumplir ratio de contraste WCAG AA (verde WhatsApp `#25D366` sobre blanco: ✓ cumple)

## Testing

- [x] Verificar manualmente en móvil que el botón abre la app de WhatsApp con el mensaje correcto
- [x] Verificar en escritorio que abre WhatsApp Web con el texto pre-cargado
- [x] Comprobar que el botón NO aparece durante el estado de carga o error de la receta
- [x] Verificar que el mensaje incluye nombre, categoría y URL con el formato esperado

## Notes

- La URL compartida será `http://localhost:3001/recipes/:id` en desarrollo — no es accesible externamente. En producción se usará la URL real del dominio sin cambios en el código (ya que se obtiene de `window.location.href`).
- WhatsApp limita el texto del mensaje a ~4096 caracteres — el mensaje generado es muy corto, no hay riesgo de truncado.
