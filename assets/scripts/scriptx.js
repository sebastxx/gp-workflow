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
                
                const numOrden = row[3];
                const producto = row[6];
                const descripcion = row[7];
                const responsable = row[8];
                const telefono = row[5];
                const id = row[0];

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

// Cargar los datos al cargar la página
window.addEventListener('load', cargarDatos);