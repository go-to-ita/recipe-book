## MODIFIED Requirements

### Requirement: Card de receta con información clave
Cada card SHALL mostrar los siguientes datos de la receta: imagen (o placeholder si no hay URL), nombre, categoría, nivel de dificultad y tiempo de preparación. La card completa SHALL ser un enlace navegable a `/recipes/:id` correspondiente a esa receta.

#### Scenario: Card completa con todos los datos
- **WHEN** la receta tiene valores para `imageUrl`, `name`, `category`, `difficulty` y `prepTime`
- **THEN** la card muestra todos esos campos de forma legible

#### Scenario: Card sin imagen
- **WHEN** la receta no tiene `imageUrl` o la URL está vacía
- **THEN** la card muestra un placeholder visual en lugar de la imagen

#### Scenario: Navegación al detalle desde la card
- **WHEN** el usuario hace clic en cualquier parte de la card de una receta
- **THEN** la aplicación navega a `/recipes/:id` con el `id` de esa receta, sin recargar la página
