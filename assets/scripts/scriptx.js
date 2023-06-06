// Configura las credenciales y la ID de la hoja de cálculo
const SPREADSHEET_ID = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
const CLIENT_ID = '721501934315-ei5o1la165isfkrajj1fpjpt4l8cneg6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';

function cargarDatos() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja!A2:L?key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los datos de la respuesta
            const rows = data.values;

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
                        <h3>${producto}</h3>
                        <p>Cliente: ${cliente}</p>
                        <p>${descripcion}</p>
                        <p class="responsable" data-responsable="${responsable}">Realizado por: ${responsable}</p>
                        <p>Teléfono: <a href="tel:${telefono}">Llamar (${telefono})</a></p>
                        <a href="#" target="_blank" class="btn btn-primary" onclick="mostrarDetalles('${id}'); return false;">Ver más</a>
                    </div>
                `;
                // Agregar la tarjeta al contenedor
                cardContainer.innerHTML += card;
            });

        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function mostrarDetalles(id) {
    // Redireccionar a la página de detalles con el ID en el query string
    window.location.href = `./details.html?id=${id}`;
}

// Cargar los datos al cargar la página
window.addEventListener('load', cargarDatos);
