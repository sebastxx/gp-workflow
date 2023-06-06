// Obtener el botón "Nueva Tarea"
const nuevaTareaBtn = document.querySelector('.nav-link.nueva-tarea');

// Agregar un evento de clic al botón
nuevaTareaBtn.addEventListener('click', crearNuevaTarea);

// Función para crear una tarjeta nueva
function crearNuevaTarea(event) {
    event.preventDefault();

    // Aquí puedes escribir el código para crear una nueva tarjeta
    // Puedes utilizar métodos como prompt() o crear elementos HTML programáticamente para solicitar información al usuario y generar una nueva tarjeta
    // Una vez que tengas la información necesaria, puedes usar el mismo código utilizado para agregar las tarjetas desde la API y agregar la nueva tarjeta al contenedor de tarjetas
}
