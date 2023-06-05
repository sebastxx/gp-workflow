// Obtener el ID del query string
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Configurar las credenciales y la ID de la hoja de cálculo
const SPREADSHEET_ID = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
const API_KEY = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';

// Obtener los detalles del ID proporcionado
function obtenerDetalles() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja!A2:L?key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;

            // Buscar el registro con el ID correspondiente
            const registro = rows.find(row => row[0] === id);

            if (registro) {
                const id = registro[0];
                const fecha = registro[1];
                const numPedido = registro[2];
                const numOrden = registro[3];
                const cliente = registro[4];
                const telefono = registro[5];
                const producto = registro[6];
                const descripcion = registro[7];
                const responsable = registro[8];
                const tarea = registro[9];
                const estado = registro[10];
                const observacion = registro[11];
                const drive = registro[12];

                // Mostrar los detalles en la página
                const detailsContainer = document.getElementById('details');
                detailsContainer.innerHTML = `
                            <h2>Producto: ${producto}</h2>
                            <p>ID: ${id}</p>
                            <p>Cliente: ${cliente}</p>
                            <p>Fecha: ${fecha}</p>
                            <p>Número de orden: ${numOrden}</p>
                            <p>Número de pedido: ${numPedido}</p>
                            <p>Descripción: ${descripcion}</p>
                            <p>Realizado por: ${responsable}</p>
                            <p>Tarea: ${tarea}</p>
                            <p>Teléfono: <a href="tel:${telefono}">Llamar (${telefono})</a></p>
                            <p>Estado: ${estado}</p>
                            <p>Observación: ${observacion}</p>
                            <p>Enlace al Drive: <a href="${drive}" target="_blank">Ver en Drive</a></p>
                            <img src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=http://127.0.0.1:5500/details.html?id=${id}&amp;choe=UTF-8" />
                            <a href="./index.html" class="btn btn-primary">Volver</a>
                        `;
            } else {
                // No se encontró ningún registro con el ID proporcionado
                const detailsContainer = document.getElementById('details');
                detailsContainer.innerHTML = '<p>No se encontraron detalles para este ID.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Cargar los detalles al cargar la página
window.addEventListener('load', obtenerDetalles);
