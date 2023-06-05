// Configura las credenciales y la ID de la hoja de cálculo
const SPREADSHEET_ID = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
const CLIENT_ID = '721501934315-ei5o1la165isfkrajj1fpjpt4l8cneg6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';

function cargarDatos() {

    //           https://sheets.googleapis.com/v4/spreadsheets/17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI/values/Hoja!A:L,majorDimension=COLUMNS?key=AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno`;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja!A:L?key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            tarjeta();
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function tarjeta() {
    // Obtener los datos de la respuesta
    

    // Obtener el contenedor de tarjetas
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    rows.forEach(row => {
        const numOrden = row[1];
        const producto = row[2];
        const descripcion = row[3];
        const responsable = row[4];
        const telefono = row[5];

        // Crear la tarjeta
        const card = document.createElement('div');
        card.classList.add('card');

        // Agregar contenido a la tarjeta

        const productoElement = document.createElement('h3');
        productoElement.textContent = `Producto: ${producto}`;
        card.appendChild(productoElement);

        const numOrdenElement = document.createElement('p');
        numOrdenElement.textContent = `Número de orden: ${numOrden}`;
        card.appendChild(numOrdenElement);

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = `Descripción: ${descripcion}`;
        card.appendChild(descripcionElement);

        const responsableElement = document.createElement('p');
        responsableElement.textContent = `Realizado por: ${responsable}`;
        card.appendChild(responsableElement);

        // Agregar la tarjeta al contenedor
        cardContainer.appendChild(card);
    });
}

// Cargar los datos al cargar la página
window.addEventListener('load', cargarDatos);

