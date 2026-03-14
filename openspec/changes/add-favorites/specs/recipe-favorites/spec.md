## ADDED Requirements

### Requirement: Toggle de favorito por receta
El sistema SHALL permitir al usuario marcar y desmarcar cualquier receta como favorita mediante una acción de toggle. El estado SHALL almacenarse como un array de IDs (`number[]`) en el slice `favorites` de Redux.

#### Scenario: Marcar receta como favorita
- **WHEN** el usuario activa el toggle de favorito sobre una receta que no está en favoritos
- **THEN** el ID de esa receta se agrega al array `favorites.ids` en el store

#### Scenario: Desmarcar receta favorita
- **WHEN** el usuario activa el toggle de favorito sobre una receta que ya está en favoritos
- **THEN** el ID de esa receta se elimina del array `favorites.ids` en el store

### Requirement: Persistencia de favoritos entre sesiones
El estado de favoritos SHALL persistir en `localStorage` bajo la clave `recipe-favorites` de forma que sobreviva a recargas de página.

#### Scenario: Persistencia al cambiar favoritos
- **WHEN** el usuario marca o desmarca una receta como favorita
- **THEN** el array actualizado de IDs se guarda en `localStorage['recipe-favorites']`

#### Scenario: Restauración al cargar la app
- **WHEN** la aplicación se inicializa y existe `localStorage['recipe-favorites']`
- **THEN** el slice `favorites` se inicializa con los IDs almacenados, restaurando el estado previo

#### Scenario: localStorage no disponible
- **WHEN** `localStorage` no está disponible o lanza una excepción
- **THEN** la app funciona correctamente con favoritos en memoria (sin persistencia), sin mostrar errores al usuario
