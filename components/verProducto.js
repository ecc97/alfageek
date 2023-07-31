import { clientService } from "../service/clientService.js";

function obtenerProducto(){
    const url = new URL(window.location);
    const nombre = url.searchParams.get('id');
    console.log(nombre);
    if (nombre === null) {
        window.location.href = '../screens/error.html';
        console.log('Ocurrio un error');
    }

    const elemento = document.querySelector('[data-info-product]');
    const imgP = document.querySelector('[data-img]');
    const tituloP = document.querySelector('[data-title]');
    const precioP = document.querySelector('[data-precioP]');
    const descripcionP = document.querySelector('[data-descripcionP]');

    clientService.verProductoLink(nombre).then((producto)=>{
        imgP.src = producto.imagen;
        tituloP.textContent = producto.nombre;
        precioP.innerHTML = '$' + ' ' + parseFloat(producto.precio).toFixed(2);
        descripcionP.textContent = producto.descripcion;
    })
}

obtenerProducto();

function productoSimilares(nombreProducto, precio, imgUrl, categoria, id) {
    precio = parseFloat(precio).toFixed(2);
    const listaCardSim = document.createElement('li');
    listaCardSim.classList.add('productos-similares--listado_item');
    const contenidoSim = `
    <img src="${imgUrl}" alt="producto" />
    <p class="listado_item_nombre">${nombreProducto}</p>
    <strong class="listado_item_precio">$ ${precio}</strong>
    <a href="producto.html?id=${id}?${nombreProducto}" class="listado_item_link">Ver producto</a>
    `;
    listaCardSim.innerHTML = contenidoSim;
    return listaCardSim;
};

const listadoSimilares = document.querySelector('[data-listadoSim]');

clientService.listaProductos().then((data)=>{
    const indicesAleatorios = generarIndicesAleatorios(data.length, 6);
    indicesAleatorios.forEach((indice)=>{
        const {nombre, precio, imagen, categoria, id} = data[indice];
        const nuevaListaS = productoSimilares(nombre, precio, imagen, categoria, id);
        listadoSimilares.appendChild(nuevaListaS);
    })
}).catch((error)=> console.log('Ocurrio un error: ', error));

function generarIndicesAleatorios(longitud, cantidad) {
    const indicesAleatorios = [];
    while (indicesAleatorios.length < cantidad) {
      const indiceAleatorio = Math.floor(Math.random() * longitud);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }
    return indicesAleatorios;
  }