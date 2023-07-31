import { clientService } from "../service/clientService.js";
import { eliminarProducto } from "./eliminarController.js";

const crearNuevaLista = (nombreProducto, precio, imagenUrl, categoria, id) => {
    precio = parseFloat(precio).toFixed(2);
    const lista = document.createElement('li');
    lista.classList.add('producto-listado_item');
    const contenido = `
        <div class="producto-img-mod">
            <img src="${imagenUrl}" alt="producto">
            <span class="mod">
                <button href="#" title="Borrar" data-btn type="button" id="${id}"><i class="material-symbols-outlined borrar">delete</i></button>
                <a href="../screens/editar-producto.html?id=${id}" title="Editar"><i class="material-symbols-outlined editar">edit</i></a>
            </span>
        </div>
        <article class="info-items">
            <p class="info-items_nombre">${nombreProducto}</p>
            <strong class="info-items_precio">$ ${precio}</strong>
            <span class="info-items_categoria">${categoria}</span>
        </article>
    `;
    lista.innerHTML = contenido;
    const btn = lista.querySelector('[data-btn]');
    btn.addEventListener('click', () => {
        const id = btn.id;
        eliminarProducto(id);
    });
    return lista;
};

const grupoListado =  document.querySelector('[data-list]');

clientService.listaProductos().then((data)=>{
    data.forEach(({nombre, precio, imagen, categoria, id}) => {
        const nuevaLista = crearNuevaLista(nombre, precio, imagen, categoria, id);
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
                    const cadaFiltrada = crearNuevaLista(nombre, precio, imagen, categoria, id);
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
    noResultado.textContent = 'No se encontró producto';
    noResultado.classList.add('no-encontrado');
    grupoListado.appendChild(noResultado)
}

/*redireccionamiento */
function logout(){
    const salir = document.getElementById('salir');
    salir.addEventListener('click', (e) =>{
        e.preventDefault();
        window.location.reload();
        window.location.href = '../index.html';
    })
}
logout();