import { clientService } from "../service/clientService.js";

function mostrarBusqueda(nombreProducto, categoria, id){
    const contenidoFiltrado = `
    <li class="nav-resultado--item">
        <a href="../screens/producto.html?id=${id}?${nombreProducto}" target="_blank"><span>${nombreProducto}</span><b>${categoria}</b></a>
    </li>
    `
    return contenidoFiltrado;
}


const listadoFiltro = document.querySelector('[data-filtrado]');
const contenedorResultados = document.createElement('div'); 
contenedorResultados.classList.add('mostrar-lista-resultados');

clientService.listaProductos().then((data)=>{
    data.forEach(({nombre, categoria, id}) => {
        const nuevaFiltrada = mostrarBusqueda(nombre, categoria, id);
        contenedorResultados.innerHTML += nuevaFiltrada;
    })
    listadoFiltro.style.display = 'none';
    listadoFiltro.appendChild(contenedorResultados);
})


let buscar = document.getElementById('buscar');

function buscarProductos(){
    buscar.addEventListener('input', (e) => {
        limpiarHTML();
        const inputTexto = e.target.value.toLowerCase().trim();
        const listadoFiltro = document.querySelector('[data-filtrado]');
        const contenedorResultados = document.createElement('div'); 
        contenedorResultados.classList.add('mostrar-lista-resultados');

        clientService.listaProductos().then((data) => {
            const resultadosFiltrados = data.filter(({nombre, categoria, id}) => {
                const terminoBusqueda = inputTexto.toLowerCase();
                return nombre.toLowerCase().includes(terminoBusqueda) || categoria.toLowerCase().includes(terminoBusqueda);
            });

            if (resultadosFiltrados.length) {
                resultadosFiltrados.forEach(({nombre, categoria, id}) => {
                    const nuevaFiltrada = mostrarBusqueda(nombre, categoria, id);
                    contenedorResultados.innerHTML += nuevaFiltrada;
                });
                listadoFiltro.style.display = 'block';
                listadoFiltro.appendChild(contenedorResultados);
            } else {
                noResultado();
            }   
        });
    });
        
    document.addEventListener('click', (e) => {
        if (!buscar.contains(e.target)) {
            const listadoFiltro = document.querySelector('[data-filtrado]');
            listadoFiltro.style.display = 'none';
            buscar.value = '';
        }
    });
    
    buscar.addEventListener('search', () => {
        const listadoFiltro = document.querySelector('[data-filtrado]');
        listadoFiltro.style.display = 'none';
        buscar.value = '';
    });

    buscar.addEventListener('change', () => {
        if (buscar.value === '') {
            const listadoFiltro = document.querySelector('[data-filtrado]');
            listadoFiltro.style.display = 'none'
        }
    });
}
buscarProductos();

function limpiarHTML(){
    while(listadoFiltro.firstChild){
        listadoFiltro.removeChild(listadoFiltro.firstChild)
    }
}

function noResultado(){
    const noResultado = document.createElement('div');
    noResultado.textContent = 'No hay resultados de búsqueda';
    noResultado.classList.add('no-resultado');
    listadoFiltro.appendChild(noResultado);
}