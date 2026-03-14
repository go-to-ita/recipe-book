## ADDED Requirements

### Requirement: Indicador de favorito en la card
Cada card del listado SHALL mostrar un botón de corazón que indica visualmente si la receta está en favoritos, y permite al usuario cambiar ese estado sin navegar al detalle.

#### Scenario: Card de receta favorita
- **WHEN** el ID de la receta está en `favorites.ids`
- **THEN** el botón de corazón en la card se muestra en estado activo (relleno/coloreado)

#### Scenario: Card de receta no favorita
- **WHEN** el ID de la receta no está en `favorites.ids`
- **THEN** el botón de corazón en la card se muestra en estado inactivo (contorno/sin color)

#### Scenario: Toggle desde la card
- **WHEN** el usuario hace clic en el botón de corazón de una card
- **THEN** se despacha `toggleFavorite(recipe.id)` y la card refleja el nuevo estado sin navegar a otra página

### Requirement: Filtro "Solo favoritos" en el listado
La barra de filtros SHALL incluir un control toggle que, cuando está activo, limita el listado a las recetas marcadas como favoritas.

#### Scenario: Activar filtro de favoritos
- **WHEN** el usuario activa el toggle "Solo favoritos"
- **THEN** el listado muestra únicamente las recetas cuyos IDs están en `favorites.ids`, respetando además los filtros de búsqueda y categoría activos

#### Scenario: Sin favoritos con filtro activo
- **WHEN** el toggle "Solo favoritos" está activo y no hay ninguna receta favorita
- **THEN** se muestra un mensaje indicando que no hay recetas favoritas aún

#### Scenario: Desactivar filtro de favoritos
- **WHEN** el usuario desactiva el toggle "Solo favoritos"
- **THEN** el listado vuelve a mostrar todas las recetas (según los demás filtros activos)
