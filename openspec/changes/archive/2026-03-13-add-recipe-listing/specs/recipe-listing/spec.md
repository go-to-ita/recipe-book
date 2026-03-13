## ADDED Requirements

### Requirement: Listado de recetas visible al entrar a la app
La página principal (`/`) SHALL mostrar todas las recetas disponibles obtenidas desde `GET http://localhost:3001/recipes`. El listado SHALL presentarse en una cuadrícula responsiva de cards.

#### Scenario: Carga exitosa del listado
- **WHEN** el usuario navega a la ruta `/`
- **THEN** se realiza una petición `GET /recipes` y se renderizan cards con los datos de cada receta

#### Scenario: Lista vacía
- **WHEN** la API devuelve un array vacío
- **THEN** se muestra un mensaje indicando que no hay recetas disponibles

### Requirement: Card de receta con información clave
Cada card SHALL mostrar los siguientes datos de la receta: imagen (o placeholder si no hay URL), nombre, categoría, nivel de dificultad y tiempo de preparación.

#### Scenario: Card completa con todos los datos
- **WHEN** la receta tiene valores para `image`, `name`, `category`, `difficulty` y `prepTime`
- **THEN** la card muestra todos esos campos de forma legible

#### Scenario: Card sin imagen
- **WHEN** la receta no tiene `image` o la URL está vacía
- **THEN** la card muestra un placeholder visual en lugar de la imagen

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
