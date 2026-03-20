### Requirement: Listado de recetas visible al entrar a la app
La página principal (`/`) SHALL mostrar las recetas disponibles obtenidas desde `GET http://localhost:3001/recipes`, filtradas según los criterios de búsqueda y categoría activos. El listado SHALL presentarse en una cuadrícula responsiva de cards. La página SHALL incluir un botón o enlace "Nueva Receta" que permita navegar al formulario de creación (`/recipes/new`).

#### Scenario: Carga exitosa del listado sin filtros
- **WHEN** el usuario navega a la ruta `/` y no hay filtros activos
- **THEN** se realiza una petición `GET /recipes` y se renderizan cards con los datos de todas las recetas

#### Scenario: Listado filtrado
- **WHEN** hay filtros activos (búsqueda por texto y/o categoría)
- **THEN** solo se renderizan las cards de las recetas que satisfacen los filtros activos

#### Scenario: Lista vacía del catálogo
- **WHEN** la API devuelve un array vacío (sin filtros activos)
- **THEN** se muestra un mensaje indicando que no hay recetas disponibles en el catálogo

#### Scenario: Botón "Nueva Receta" visible
- **WHEN** el usuario está en la página de listado (`/`)
- **THEN** se muestra un botón o enlace "Nueva Receta" visible en la página

#### Scenario: Navegación al formulario de creación desde el listado
- **WHEN** el usuario hace click en "Nueva Receta"
- **THEN** la aplicación navega a `/recipes/new`

### Requirement: Card de receta con información clave
Cada card SHALL mostrar los siguientes datos de la receta: imagen (o placeholder si no hay URL), nombre, categoría, nivel de dificultad y tiempo de preparación. La card SHALL incluir un texto o control de navegación que permita ir al detalle de la receta.

#### Scenario: Card completa con todos los datos
- **WHEN** la receta tiene valores para `imageUrl`, `name`, `category`, `difficulty` y `prepTime`
- **THEN** la card muestra todos esos campos de forma legible

#### Scenario: Card sin imagen
- **WHEN** la receta no tiene `imageUrl` o la URL está vacía
- **THEN** la card muestra un placeholder visual en lugar de la imagen

### Requirement: Navegación al detalle desde la card
Cada card del listado SHALL permitir al usuario navegar a la página de detalle de la receta correspondiente.

#### Scenario: Click en la card para ver el detalle
- **WHEN** el usuario hace click en la card (o en el control de navegación de la card)
- **THEN** la aplicación navega a la ruta de detalle de esa receta (p.ej. `/recipes/:id`)

### Requirement: Estado de carga mientras se obtienen las recetas
La UI SHALL mostrar un indicador visual de carga mientras la petición a `/recipes` está en curso.

#### Scenario: Petición en progreso
- **WHEN** el componente monta y RTK Query aún no ha resuelto la petición
- **THEN** se renderiza un indicador de carga (spinner o skeleton) y no se muestran cards

### Requirement: Estado de error cuando falla la petición
La UI SHALL mostrar un mensaje de error cuando la petición a `/recipes` falla (servidor no disponible o respuesta no-OK).

#### Scenario: Error de red o servidor
- **WHEN** la petición `GET /recipes` retorna un error o no hay conexión con el servidor
- **THEN** se muestra un mensaje de error descriptivo y no se renderizan cards
