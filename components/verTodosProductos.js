import { clientService } from "../service/clientService.js";

const verTodoProductos = (nombreProducto, precio, imagenUrl, categoria, id) => {
    precio = parseFloat(precio).toFixed(2);
    const lista = document.createElement('li');
    lista.classList.add('producto-listado_item');
    const contenido = `
        <div class="producto-img-mod">
            <img src="${imagenUrl}" alt="producto">
        </div>
        <article class="info-items">
            <p class="info-items_nombre">${nombreProducto}</p>
            <strong class="info-items_precio">$ ${precio}</strong>
            <a href="producto.html?id=${id}?${nombreProducto}" class="info-items_link">Ver producto</a>
        </article>
    `;
    lista.innerHTML = contenido;
    return lista;
};

const grupoListado =  document.querySelector('[data-list]');

clientService.listaProductos().then((data)=>{
    data.forEach(({nombre, precio, imagen, categoria, id}) => {
        const nuevaLista = verTodoProductos(nombre, precio, imagen, categoria, id);
        grupoListado.appendChild(nuevaLista);
    });
}).catch((error)=> console.log('Ocurrio un error: ', error));

/* Apartado de busqueda de productos */
let busqueda = document.getElementById('buscar');

function buscarProductos(){
    busqueda.addEventListener('input', (e) => {
        limpiarHTML();
        const inputTexto = e.target.value.toLowerCase().trim();
        const grupoListado =  document.querySelector('[data-list]');

        clientService.listaProductos().then((data)=>{
            const filtradosR = data.filter(({nombre, precio, imagen, categoria, id}) => {
                const terminos = inputTexto.toLowerCase();
                return nombre.toLowerCase().includes(terminos) || precio.toString().includes(terminos) || categoria.toLowerCase().includes(terminos);
            });

            if (filtradosR.length) {
                filtradosR.forEach(({nombre, precio, imagen, categoria, id}) => {
                    const cadaFiltrada = verTodoProductos(nombre, precio, imagen, categoria, id);
                    grupoListado.appendChild(cadaFiltrada);
                });
            } else {
                noResultado();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!busqueda.contains(e.target)) {
            busqueda.value = '';
        }
    });

    busqueda.addEventListener('search', () => {
        buscar.value = '';
    });

}
buscarProductos();

function limpiarHTML(){
    while(grupoListado.firstChild){
        grupoListado.removeChild(grupoListado.firstChild)
    }
}

function noResultado(){
    const noResultado = document.createElement('strong');
    noResultado.textContent = 'No hay resultados';
    noResultado.classList.add('no-encontrado');
    grupoListado.appendChild(noResultado)
}

