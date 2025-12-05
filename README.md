🥋 Turnero Cobra Kai – Entrega Final

Este proyecto es un sistema de reservas para un Dojo de Karate. Permite que los usuarios elijan actividad, fecha, horario y completen sus datos para registrar su turno.
Incluye historial, edición de reservas, eliminación individual y borrado total del historial.

Desarrollado como entrega final para JavaScript (DOM, Eventos, Arrays, Storage).

🚀 Funcionalidades principales

Formulario de reservas

Nombre, apellido y email

Selección de actividad

Elección de día mediante <input type="date">

Horarios dinámicos según el día seleccionado

Validaciones incluidas

Evita reservas duplicadas (misma persona + mismo horario)

Verifica cupos disponibles por horario

Campos obligatorios

Historial de reservas

Muestra todas las reservas guardadas en localStorage

Botón para eliminar una reserva

Botón para editar una reserva cargando los datos al formulario

Botón para borrar todo el historial

💾 Uso de LocalStorage

El sistema almacena todas las reservas en localStorage.
El historial se carga automáticamente al recargar la página.

📁 Organización del proyecto

📦 proyecto
├── index.html
├── assets/
│ ├── css/
│ │ └── style.css
│ └── img/ # Imágenes del proyecto (fondos, logos, etc.)
├── js/
│ ├── main.js # Lógica del formulario y reservas
│ └── historial.js # Renderizado y acciones del historial
└── db/
└── data.json # Actividades y horarios

🛠️ Tecnologías utilizadas

HTML5

CSS3 / Bootstrap

JavaScript (DOM + Eventos)

LocalStorage

Toastify → mensajes rápidos

SweetAlert2 → ventanas de confirmación

JSON local para simular "base de datos"

📄 Licencia

Uso educativo. Libre para copiar o modificar.

> “Cobra Kai nunca muere” 🐍🔥

## Autor

Proyecto realizado por **[Sueldo Alan]**  
Preentrega 2 de JavaScript - Profesor: Jesus Gabriel Jorge
Comisión: 80770
