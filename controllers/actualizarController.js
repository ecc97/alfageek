import { clientService } from "../service/clientService.js";

const formulArio = document.querySelector('[data-form]');

const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if (id === null) {
        window.location.href = '../screens/error.html';
        console.error(id);
    }

    const nombreProducto = document.querySelector('[data-tipo="nombreProducto"]');
    const precio = document.querySelector('[data-tipo="precio"]');
    const urlImg = document.querySelector('[data-tipo="url"]');
    const categoria = document.querySelector('[data-tipo="categoria"]');
    const descripcion = document.getElementById('descripcion');
    clientService.detalleProducto(id).then((producto) => {
        nombreProducto.value = producto.nombre;
        precio.value = producto.precio;
        urlImg.value = producto.imagen;
        categoria.value = producto.categoria;
        descripcion.value = producto.descripcion;
    });
};

obtenerInformacion();

formulArio.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    const nombreProducto = document.querySelector('[data-tipo="nombreProducto"]').value;
    const precio = parseFloat(document.querySelector('[data-tipo="precio"]').value);
    const urlImg = document.querySelector('[data-tipo="url"]').value;
    const categoria = document.querySelector('[data-tipo="categoria"]').value;
    const descripcion = document.getElementById('descripcion').value;

    clientService.actualizarProducto(nombreProducto, precio, urlImg, categoria, descripcion, id).then(() => {
        const mensajeAct = document.getElementById('act-completado');
        mensajeAct.innerHTML = 'Producto actualizado con éxito';
        mensajeAct.style.display = 'block';
        window.location.href = '../screens/admin.html';
        setTimeout( function () {formulArio.submit()}, 2000);
    }).catch((error) => console.error(error));
})