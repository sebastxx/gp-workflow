function authorize() {
    gapi.auth2.getAuthInstance().signIn().then(function () {
        // El usuario ha iniciado sesión exitosamente
        // Obtén el token de acceso: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
    });
}