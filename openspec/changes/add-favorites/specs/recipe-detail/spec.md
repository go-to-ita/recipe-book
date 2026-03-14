## ADDED Requirements

### Requirement: Toggle de favorito en la página de detalle
La página de detalle SHALL mostrar un botón que indica si la receta actual está en favoritos y permite al usuario marcarla o desmarcarla.

#### Scenario: Receta favorita en el detalle
- **WHEN** el usuario navega al detalle de una receta cuyo ID está en `favorites.ids`
- **THEN** el botón de favorito se muestra en estado activo (relleno/coloreado)

#### Scenario: Receta no favorita en el detalle
- **WHEN** el usuario navega al detalle de una receta cuyo ID no está en `favorites.ids`
- **THEN** el botón de favorito se muestra en estado inactivo (contorno/sin color)

#### Scenario: Toggle desde el detalle
- **WHEN** el usuario hace clic en el botón de favorito en la página de detalle
- **THEN** se despacha `toggleFavorite(recipe.id)`, el botón refleja el nuevo estado y el cambio es visible también en el listado al volver
