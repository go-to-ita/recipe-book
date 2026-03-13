### Requirement: Vista de detalle de receta individual
La página de detalle (`/recipes/:id`) SHALL obtener y mostrar toda la información de una receta concreta mediante `GET http://localhost:3001/recipes/:id`.

#### Scenario: Carga exitosa del detalle
- **WHEN** el usuario navega a `/recipes/:id` con un `id` válido
- **THEN** se realiza una petición `GET /recipes/:id` y se renderizan todos los datos de la receta

#### Scenario: Error al cargar el detalle
- **WHEN** la petición `GET /recipes/:id` falla o el `id` no existe
- **THEN** se muestra un mensaje de error descriptivo

### Requirement: Lista de ingredientes en el detalle
La página de detalle SHALL mostrar la lista completa de ingredientes de la receta.

#### Scenario: Ingredientes visibles
- **WHEN** la receta tiene un array `ingredients` con uno o más elementos
- **THEN** se renderizan todos los ingredientes de forma legible (p.ej. en lista)

#### Scenario: Sin ingredientes
- **WHEN** la receta no tiene ingredientes o el array está vacío
- **THEN** se indica al usuario que no hay ingredientes disponibles

### Requirement: Pasos de preparación numerados
La página de detalle SHALL mostrar los pasos de preparación de la receta en orden y numerados.

#### Scenario: Pasos visibles y numerados
- **WHEN** la receta tiene un array `steps` con uno o más elementos
- **THEN** se renderizan todos los pasos en orden, numerados de forma secuencial

#### Scenario: Sin pasos
- **WHEN** la receta no tiene pasos o el array está vacío
- **THEN** se indica al usuario que no hay pasos de preparación disponibles

### Requirement: Navegación de vuelta al listado
La página de detalle SHALL ofrecer un control de navegación que permita al usuario volver al listado de recetas.

#### Scenario: Volver al listado
- **WHEN** el usuario activa el control de navegación (botón, enlace u otro)
- **THEN** la aplicación navega de vuelta a la ruta `/`
