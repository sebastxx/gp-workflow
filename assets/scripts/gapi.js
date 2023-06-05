function loadClient() {
    gapi.client.load('sheets', 'v4', writeToSheet);
}

function authorize() {
    gapi.auth2.getAuthInstance().signIn().then(function () {
        // El usuario ha iniciado sesión exitosamente
        // Obtén el token de acceso: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
    });
}

function writeToSheet() {
    const spreadsheetId = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
    const range = 'Hoja!A1:B2'; // Rango de celdas que deseas actualizar
    const values = [
        ['Dato1', 'Dato2'], // Los nuevos valores que deseas escribir en la hoja de cálculo
        ['Dato3', 'Dato4']
    ];

    const params = {
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values: values }
    };

    gapi.client.sheets.spreadsheets.values.update(params)
        .then(response => {
            console.log('Valores actualizados con éxito:', response);
        })
        .catch(error => {
            console.error('Error al actualizar los valores:', error);
        });
}

gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        clientId: '721501934315-9ssrfclchq8s6ffdi9noria9raktvbk9.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
        console.log('La biblioteca gapi está lista');
        // La biblioteca gapi está lista
    });
    console.log('La biblioteca gapi está lista');
}