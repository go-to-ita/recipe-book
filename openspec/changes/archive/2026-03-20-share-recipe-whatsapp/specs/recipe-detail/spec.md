## ADDED Requirements

### Requirement: Compartir receta por WhatsApp
La página de detalle SHALL incluir un botón o enlace "Compartir por WhatsApp" que, al ser activado, abra WhatsApp con un mensaje pre-formateado que incluya el nombre de la receta, la categoría y la URL de la página de detalle actual. El enlace SHALL construirse usando `https://wa.me/?text=...` con el texto codificado como parámetro URL.

#### Scenario: Activar el botón de compartir
- **WHEN** el usuario hace click en el botón "Compartir por WhatsApp" en la página de detalle
- **THEN** se abre WhatsApp (app o web) con un mensaje pre-formateado que contiene el nombre de la receta, su categoría y la URL de la página actual

#### Scenario: Formato del mensaje de WhatsApp
- **WHEN** el usuario activa el botón de compartir para una receta con nombre "Tacos al Pastor" y categoría "Cena"
- **THEN** el mensaje pre-cargado en WhatsApp contiene el nombre, la categoría y el enlace a la receta en ese orden

#### Scenario: Botón visible solo cuando la receta está cargada
- **WHEN** la receta aún está cargando o se produjo un error al obtenerla
- **THEN** el botón de compartir NO se muestra (solo aparece cuando los datos de la receta están disponibles)
