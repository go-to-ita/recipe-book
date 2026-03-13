## ADDED Requirements

### Requirement: Vista de detalle de receta individual
La aplicación SHALL exponer la ruta `/recipes/:id` que renderiza la página de detalle de la receta con el `id` correspondiente, obteniendo sus datos desde `GET http://localhost:3001/recipes/:id`.

#### Scenario: Carga exitosa del detalle
- **WHEN** el usuario navega a `/recipes/:id` con un `id` válido
- **THEN** se realiza una petición `GET /recipes/:id`, y la página muestra imagen, nombre, descripción, categoría, dificultad y tiempo de preparación de la receta

#### Scenario: Estado de carga
- **WHEN** el componente monta y la petición `GET /recipes/:id` está en curso
- **THEN** la página muestra un indicador visual de carga y no se renderiza el contenido de la receta

#### Scenario: Receta no encontrada (404)
- **WHEN** el servidor responde con 404 o error para el `id` solicitado
- **THEN** la página muestra un mensaje indicando que la receta no existe y un botón para volver al listado

### Requirement: Lista de ingredientes en el detalle
La página de detalle SHALL mostrar todos los ingredientes de la receta en una lista ordenada.

#### Scenario: Receta con ingredientes
- **WHEN** la receta tiene al menos un ingrediente en el campo `ingredients`
- **THEN** se renderiza cada ingrediente como un ítem de lista legible

### Requirement: Pasos de preparación numerados
La página de detalle SHALL mostrar los pasos de preparación de la receta en orden, numerados secuencialmente.

#### Scenario: Receta con pasos
- **WHEN** la receta tiene al menos un paso en el campo `steps`
- **THEN** se renderizan los pasos en orden, cada uno con su número de secuencia visible

### Requirement: Navegación de vuelta al listado
La página de detalle SHALL incluir un control de navegación que lleve al usuario de regreso a la ruta `/recipes`.

#### Scenario: Clic en botón volver
- **WHEN** el usuario hace clic en el botón "Volver al listado"
- **THEN** la aplicación navega a `/recipes` sin recargar la página
