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






function escribirEnHojaDeDatos() {
    const spreadsheetId = '17CrG87_7vm2FDNAeo067H-fexDHf9_Y9xMCTmdRBnJI';
    const range = 'Hoja!A1:B2';
    const accessToken = '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';

    const textoInput = document.getElementById('textoInput');
    const texto = textoInput.value;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`;

    const requestBody = {
        values: [
            [texto] // El texto que se ingresó en el campo de texto
        ]
    };

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Texto agregado con éxito:', data);
        })
        .catch(error => {
            console.error('Error al agregar texto:', error);
        });
}

