## ADDED Requirements

### Requirement: Búsqueda de recetas por texto
La UI SHALL incluir un campo de texto que filtre el listado de recetas por nombre y descripción de forma case-insensitive. El filtrado SHALL aplicarse en tiempo real conforme el usuario escribe.

#### Scenario: Filtrado por nombre
- **WHEN** el usuario escribe texto en el campo de búsqueda
- **THEN** solo se muestran las recetas cuyo `name` contiene el texto introducido (case-insensitive)

#### Scenario: Filtrado por descripción
- **WHEN** el usuario escribe texto en el campo de búsqueda
- **THEN** también se muestran recetas cuya `description` contiene el texto (case-insensitive)

#### Scenario: Campo vacío muestra todo
- **WHEN** el campo de búsqueda está vacío
- **THEN** se muestran todas las recetas sin filtrar por texto

### Requirement: Filtro de categoría mediante dropdown
La UI SHALL incluir un dropdown cargado con las categorías obtenidas de `GET http://localhost:3001/categories`. Seleccionar una categoría SHALL filtrar el listado para mostrar solo las recetas de esa categoría.

#### Scenario: Carga de categorías
- **WHEN** la página se carga
- **THEN** el dropdown muestra una opción "Todas las categorías" y una opción por cada categoría devuelta por la API

#### Scenario: Filtrado por categoría seleccionada
- **WHEN** el usuario selecciona una categoría del dropdown
- **THEN** solo se muestran las recetas cuyo campo `category` coincide con la categoría seleccionada

#### Scenario: Opción "Todas las categorías"
- **WHEN** el usuario selecciona la opción por defecto "Todas las categorías"
- **THEN** no se aplica filtro de categoría y se muestran todas las recetas

### Requirement: Filtros combinados
Cuando búsqueda por texto y filtro de categoría están activos simultáneamente, la UI SHALL mostrar solo las recetas que satisfacen AMBOS criterios (AND).

#### Scenario: Combinación de búsqueda y categoría
- **WHEN** el usuario ha introducido texto en la búsqueda Y ha seleccionado una categoría
- **THEN** solo se muestran recetas que coinciden con el texto AND pertenecen a la categoría seleccionada

### Requirement: Contador de resultados
La UI SHALL mostrar en todo momento el número de recetas que coinciden con los filtros activos en formato "X recetas encontradas".

#### Scenario: Contador actualizado al filtrar
- **WHEN** el usuario aplica o modifica cualquier filtro
- **THEN** el contador se actualiza inmediatamente con el número de recetas visibles

#### Scenario: Contador sin filtros activos
- **WHEN** no hay filtros activos
- **THEN** el contador muestra el total de recetas disponibles

### Requirement: Estado vacío cuando no hay coincidencias
Cuando los filtros activos no producen ninguna receta, la UI SHALL mostrar un mensaje de estado vacío que indique que no se encontraron resultados para los filtros aplicados.

#### Scenario: Sin resultados por búsqueda
- **WHEN** el texto de búsqueda no coincide con ninguna receta
- **THEN** se muestra un mensaje del tipo "No se encontraron recetas para '<texto>'" y no se renderizan cards

#### Scenario: Sin resultados por combinación de filtros
- **WHEN** la combinación de búsqueda y categoría no produce resultados
- **THEN** se muestra un estado vacío diferenciado del estado de "sin recetas en el catálogo"
