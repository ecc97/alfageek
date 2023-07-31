import { clientService } from "../service/clientService.js";

const forMulario = document.querySelector('[data-form]');

forMulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    const nombreProducto = document.querySelector('[data-tipo="nombreProducto"]').value;
    const precio = parseFloat(document.querySelector('[data-tipo="precio"]').value);
    const urlImg = document.querySelector('[data-tipo="url"]').value;
    const categoria = document.querySelector('[data-tipo="categoria"]').value;
    const descripcion = document.getElementById('descripcion').value;
    clientService.crearProducto(nombreProducto, precio, urlImg, categoria, descripcion).then((respuesta) => {
        console.log(respuesta)
        const darMensaje = document.getElementById('mensaje-completado');
        darMensaje.innerHTML = 'Producto agregado con éxito';
        darMensaje.style.display = 'block';
        setTimeout( function () {forMulario.submit();}, 2000);
        window.open("../index.html", "_blank");
    }).catch((error) => console.error(error));
})