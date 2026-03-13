## MODIFIED Requirements

### Requirement: Listado de recetas visible al entrar a la app
La página principal (`/`) SHALL mostrar las recetas disponibles obtenidas desde `GET http://localhost:3001/recipes`, filtradas según los criterios de búsqueda y categoría activos. El listado SHALL presentarse en una cuadrícula responsiva de cards.

#### Scenario: Carga exitosa del listado sin filtros
- **WHEN** el usuario navega a la ruta `/` y no hay filtros activos
- **THEN** se realiza una petición `GET /recipes` y se renderizan cards con los datos de todas las recetas

#### Scenario: Listado filtrado
- **WHEN** hay filtros activos (búsqueda por texto y/o categoría)
- **THEN** solo se renderizan las cards de las recetas que satisfacen los filtros activos

#### Scenario: Lista vacía del catálogo
- **WHEN** la API devuelve un array vacío (sin filtros activos)
- **THEN** se muestra un mensaje indicando que no hay recetas disponibles en el catálogo
