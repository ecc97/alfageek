import { clientService } from "../service/clientService.js";

const forMulario = document.querySelector('[data-form]');

forMulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    const email = document.querySelector('[data-tipo="email"]').value;
    const contrasena = document.querySelector('[data-tipo="password"]').value;
    clientService.login(email, contrasena).then((respuesta) => {
        if (respuesta && respuesta.autenticado) {
            window.location.href = '../screens/admin.html';
        }else{
            const mensajeError = document.querySelector('.form-mensaje-error');
            mensajeError.style.display = 'block';
            mensajeError.innerHTML = 'Credenciales inválidas, por favor inténtalo nuevamente.';
        }
    }).catch((error) => console.error(error));
});