// Configura las credenciales y la ID de la hoja de cálculo
const SPREADSHEET_ID = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
const CLIENT_ID = '721501934315-ei5o1la165isfkrajj1fpjpt4l8cneg6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';

function cargarDatos() {

    //           https://sheets.googleapis.com/v4/spreadsheets/17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI/values/Hoja!A:L?key=AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno`;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja!A:L?key=${API_KEY}`;

    

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los datos de la respuesta
            const rows = data.values;

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
                    <div class="card">
                        <h3>Producto: ${producto}</h3>
                        <p>Número de orden: ${numOrden}</p>
                        <p>Descripción: ${descripcion}</p>
                        <p>Realizado por: ${responsable}</p>
                        <p>Teléfono:  <a href="phone:${telefono}">Llamar (${telefono})</p>
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

// Cargar los datos al cargar la página
window.addEventListener('load', cargarDatos);

function mostrarDetalles(id) {
    const producto = obtenerProductoPorId(id);
    const numOrden = obtenerNumOrdenPorId(id);
    const descripcion = obtenerDescripcionPorId(id);
    const responsable = obtenerResponsablePorId(id);
    const telefono = obtenerTelefonoPorId(id);

    // Generar el HTML del modal con interpolación de cadenas
    const modalHTML = `
    <div class="modal fade" id="modalDetalles" tabindex="-1" role="dialog" aria-labelledby="modalDetallesLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalDetallesLabel">Detalles del producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Producto: ${producto}</h3>
            <p>Número de orden: ${numOrden}</p>
            <p>Descripción: ${descripcion}</p>
            <p>Realizado por: ${responsable}</p>
            <p>Teléfono: <a href="phone:${telefono}">Llamar (${telefono})</a></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `;

    // Agregar el HTML del modal al final del cuerpo del documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Mostrar el modal utilizando la función modal de Bootstrap
    const modalElement = document.getElementById('modalDetalles');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}


// var obj = JSON.parse(url); // Parsea el JSON en un objeto JavaScript

// var objetosTransformados = obj.map(function (elemento) {
//     var nuevoObjeto = {
//         _id: elemento[0],
//         fecha: elemento[1],
//         orden_pedido: elemento[2],
//         orden_trabajo: elemento[3],
//         cliente: elemento[4],
//         telefono: elemento[5],
//         producto: elemento[6],
//         descripcion: elemento[7],
//         responsable: elemento[8],
//         tarea: elemento[9],
//         estado: elemento[10],
//         observaciones: elemento[11]
//     };

//     return nuevoObjeto;
// });

// console.log(objetosTransformados);

