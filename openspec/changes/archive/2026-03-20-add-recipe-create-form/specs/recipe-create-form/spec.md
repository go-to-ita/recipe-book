## ADDED Requirements

### Requirement: Formulario de creación accesible desde la ruta /recipes/new
La aplicación SHALL exponer la ruta `/recipes/new` que renderiza el formulario de creación de recetas. La página SHALL incluir un título descriptivo y un botón o enlace para volver al listado.

#### Scenario: Navegación directa a la ruta
- **WHEN** el usuario navega a `/recipes/new`
- **THEN** se renderiza el formulario de creación con todos sus campos visibles

#### Scenario: Botón volver al listado
- **WHEN** el usuario hace click en "Volver" o el enlace de cancelar
- **THEN** la aplicación navega de regreso a `/`

### Requirement: Campos obligatorios del formulario
El formulario SHALL incluir los siguientes campos requeridos: nombre de la receta (texto), descripción (textarea), categoría (dropdown cargado desde GET /categories), dificultad (selector entre Fácil / Media / Difícil) y tiempo de preparación en minutos (número entero positivo).

#### Scenario: Render inicial del formulario vacío
- **WHEN** el formulario se renderiza por primera vez
- **THEN** todos los campos obligatorios están vacíos y sin errores de validación

#### Scenario: Dropdown de categorías poblado desde la API
- **WHEN** el formulario monta y GET /categories responde exitosamente
- **THEN** el dropdown de categoría muestra todas las categorías disponibles como opciones seleccionables

#### Scenario: Dropdown de categorías con error de carga
- **WHEN** GET /categories falla o está cargando
- **THEN** el dropdown muestra un estado de carga o un mensaje de error y no bloquea el resto del formulario

### Requirement: Campo opcional de URL de imagen
El formulario SHALL incluir un campo de texto opcional para la URL de la imagen de la receta. Si se ingresa un valor, SHALL validarse que tenga formato de URL válida.

#### Scenario: URL de imagen válida
- **WHEN** el usuario ingresa una cadena con formato URL válido (http:// o https://)
- **THEN** el campo no muestra error de validación

#### Scenario: URL de imagen con formato inválido
- **WHEN** el usuario ingresa texto que no tiene formato de URL válida
- **THEN** el campo muestra un mensaje de error indicando que debe ser una URL válida

#### Scenario: Campo de imagen vacío
- **WHEN** el usuario deja el campo de imagen en blanco
- **THEN** no se muestra error (el campo es opcional)

### Requirement: Lista dinámica de ingredientes
El formulario SHALL permitir agregar y quitar ingredientes de forma dinámica. Deberá existir al menos un ingrediente al enviar el formulario. Cada ingrediente es una cadena de texto.

#### Scenario: Agregar ingrediente
- **WHEN** el usuario hace click en el botón "Agregar ingrediente"
- **THEN** se añade un nuevo campo de texto vacío al final de la lista de ingredientes

#### Scenario: Quitar ingrediente
- **WHEN** el usuario hace click en el botón de eliminar junto a un ingrediente
- **THEN** ese ingrediente se elimina de la lista

#### Scenario: Intentar quitar el único ingrediente
- **WHEN** solo existe un ingrediente en la lista y el usuario intenta eliminarlo
- **THEN** el botón de eliminar está deshabilitado o la acción no está disponible para ese único campo

#### Scenario: Ingrediente vacío al enviar
- **WHEN** el usuario intenta enviar el formulario con un campo de ingrediente vacío
- **THEN** se muestra un error de validación indicando que el ingrediente no puede estar vacío

### Requirement: Lista dinámica de pasos de preparación con reordenamiento
El formulario SHALL permitir agregar, quitar y reordenar pasos de preparación. Cada paso es una cadena de texto. Deberá existir al menos un paso al enviar el formulario.

#### Scenario: Agregar paso
- **WHEN** el usuario hace click en "Agregar paso"
- **THEN** se añade un nuevo campo de texto vacío al final de la lista de pasos

#### Scenario: Quitar paso
- **WHEN** el usuario hace click en el botón de eliminar junto a un paso
- **THEN** ese paso se elimina de la lista

#### Scenario: Mover paso hacia arriba
- **WHEN** el usuario hace click en el botón ▲ de un paso que no es el primero
- **THEN** ese paso intercambia posición con el paso anterior

#### Scenario: Mover paso hacia abajo
- **WHEN** el usuario hace click en el botón ▼ de un paso que no es el último
- **THEN** ese paso intercambia posición con el paso siguiente

#### Scenario: Botones de reordenamiento deshabilitados en extremos
- **WHEN** un paso es el primero de la lista
- **THEN** su botón ▲ está deshabilitado; y cuando es el último, su botón ▼ está deshabilitado

#### Scenario: Paso vacío al enviar
- **WHEN** el usuario intenta enviar el formulario con un campo de paso vacío
- **THEN** se muestra un error de validación indicando que el paso no puede estar vacío

### Requirement: Validación de campos requeridos con mensajes de error claros
Al intentar enviar el formulario, el sistema SHALL validar todos los campos requeridos y SHALL mostrar mensajes de error descriptivos en español junto a cada campo inválido. El formulario no SHALL enviarse si hay errores.

#### Scenario: Envío con campos requeridos vacíos
- **WHEN** el usuario intenta enviar el formulario con uno o más campos requeridos vacíos
- **THEN** no se realiza ninguna petición a la API y se muestran mensajes de error en los campos correspondientes

#### Scenario: Mensaje de error visible y descriptivo
- **WHEN** un campo falla validación
- **THEN** el mensaje de error aparece visualmente asociado al campo, en español, describiendo qué está mal

#### Scenario: Error desaparece al corregir el campo
- **WHEN** el usuario corrige el valor de un campo que tenía error
- **THEN** el mensaje de error de ese campo desaparece

### Requirement: Envío del formulario mediante POST /recipes
Al enviar el formulario con datos válidos, el sistema SHALL realizar una petición `POST /recipes` con el cuerpo de la receta y SHALL mostrar feedback visual del estado de la operación.

#### Scenario: Envío exitoso
- **WHEN** el usuario completa todos los campos requeridos correctamente y hace click en "Guardar receta"
- **THEN** se realiza `POST /recipes` con los datos del formulario, y al recibir respuesta exitosa la aplicación navega al listado de recetas (`/`)

#### Scenario: Estado de carga durante el envío
- **WHEN** la petición `POST /recipes` está en curso
- **THEN** el botón de envío muestra un indicador de carga y está deshabilitado para evitar doble envío

#### Scenario: Error al guardar
- **WHEN** `POST /recipes` retorna un error o falla la conexión
- **THEN** se muestra un mensaje de error descriptivo y el usuario puede reintentar sin perder los datos del formulario
