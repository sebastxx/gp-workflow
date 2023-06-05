// Configura las credenciales y la ID de la hoja de cálculo
const SPREADSHEET_ID = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
const CLIENT_ID = '721501934315-ei5o1la165isfkrajj1fpjpt4l8cneg6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';

function cargarDatos() {

    //           https://sheets.googleapis.com/v4/spreadsheets/17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI/values/Hoja!A2:L?key=AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno`;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja!A2:L?key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los datos de la respuesta
            const rows = data.values;

            // Obtener los responsables únicos
            const responsablesSet = new Set();
            rows.forEach(row => {
                const responsable = row[8];
                responsablesSet.add(responsable);
            });

            // Obtener el elemento select y generar las opciones
            const selectResponsable = document.getElementById('selectResponsable');
            responsablesSet.forEach(responsable => {
                const option = document.createElement('option');
                option.value = responsable;
                option.textContent = responsable;
                selectResponsable.appendChild(option);
                console.log(responsable);
            });

            // Asignar el evento de cambio al elemento select
            selectResponsable.addEventListener('change', filtrarTarjetasPorResponsable);

            // Obtener el contenedor de tarjetas
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = '';

            rows.forEach(row => {

                const id = row[0];
                const fecha = row[1];
                const numPedido = row[2];
                const numOrden = row[3];
                const cliente = row[4];
                const telefono = row[5];
                const producto = row[6];
                const descripcion = row[7];
                const responsable = row[8];
                const tarea = row[9];
                const estado = row[10];
                const observacion = row[11];
                const drive = row[12];
                

                // Crear la tarjeta con interpolación de cadenas
                const card = `
                    <div class="card ${responsable.toLowerCase()}">
                        <h3>Producto: ${producto}</h3>
                        <p>Número de orden: ${numOrden}</p>
                        <p>Descripción: ${descripcion}</p>
                        <p class="responsable" data-responsable="${responsable}">Realizado por: ${responsable}</p>
                        <p>Teléfono:  <a href="tel:${telefono}">Llamar (${telefono})</p>
                        <a href="#" onclick="mostrarDetalles('${id}')" class="btn btn-primary">Ver más</a>
                    </div>
                `;
                // Agregar la tarjeta al contenedor
                const cardContainer = document.querySelector('.card-container');
                cardContainer.innerHTML += card;
            });
            
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

//Función para Filtrar por Responsable de la tarjeta
function filtrarTarjetasPorResponsable() {
    const selectResponsable = document.getElementById('selectResponsable');
    const responsableSeleccionado = selectResponsable.value.trim().toLowerCase();

    const tarjetas = document.querySelectorAll('.card');
    tarjetas.forEach(tarjeta => {
        if (
            responsableSeleccionado === '' ||
            tarjeta.classList.contains(responsableSeleccionado)
        ) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

//función para buscar dentro de las tarjetas
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', buscarTarjetas);

function buscarTarjetas() {
    const searchText = searchInput.value.trim().toLowerCase();
    const tarjetas = document.querySelectorAll('.card');

    tarjetas.forEach(tarjeta => {
        const cardText = tarjeta.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

function mostrarDetalles(id) {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');

    // Obtener los datos adicionales de la API usando el ID
    // Aquí puedes agregar tu lógica para obtener los datos adicionales de la API
    // Puedes usar fetch o cualquier otra forma de obtener los datos

    // Ejemplo de datos adicionales
    const datosAdicionales = {
        link: 'https://www.ejemplo.com',
        qrCode: 'https://www.ejemplo.com/qr.png',
        observacion: 'Esto es una observación adicional',
    };

    // Actualizar el contenido del modal con los datos adicionales
    modalContent.innerHTML = `
    <p>Enlace: <a href="${datosAdicionales.link}" target="_blank">${datosAdicionales.link}</a></p>
    <img src="${datosAdicionales.qrCode}" alt="Código QR">
    <p>Observación: ${datosAdicionales.observacion}</p>
  `;

    // Mostrar el modal
    modalOverlay.style.display = 'flex';

    // Cerrar el modal cuando se hace clic en el botón "Cerrar"
    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}













// Cargar los datos al cargar la página
window.addEventListener('load', cargarDatos);