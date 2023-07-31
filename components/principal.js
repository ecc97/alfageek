import { clientService } from "../service/clientService.js";

const cardCamisetas = (nombreProducto, precio, imgUrl, categoria, id) => {
    precio = parseFloat(precio).toFixed(2);
    const listaCard = document.createElement('li');
    listaCard.classList.add('camisetas--camiseta');
    const contenido = `
    <img src="${imgUrl}" alt="producto" />
    <p class="camisetas--camiseta_nombre">${nombreProducto}</p>
    <strong class="camisetas--camiseta_precio">$ ${precio}</strong>
    <a href="screens/producto.html?id=${id}?${nombreProducto}" class="camisetas-camiseta_link">Ver producto</a>
    `;
    listaCard.innerHTML = contenido;
    return listaCard;
};

const cardFiguras = (nombreProducto, precio, imgUrl, categoria, id) => {
    precio = parseFloat(precio).toFixed(2);
    const listaCard = document.createElement('li');
    listaCard.classList.add('figuras--figura');
    const contenido = `
    <img src="${imgUrl}" alt="producto" />
    <p class="figuras--figura_nombre">${nombreProducto}</p>
    <strong class="figurtas--figura_precio">$ ${precio}</strong>
    <a href="screens/producto.html?id=${id}?${nombreProducto}" class="figuras--figura_link">Ver producto</a>
    `;
    listaCard.innerHTML = contenido;
    return listaCard;
};

const cardConsolas = (nombreProducto, precio, imgUrl, categoria, id) => {
    precio = parseFloat(precio).toFixed(2);
    const listaCard = document.createElement('li');
    listaCard.classList.add('consolas--consola');
    const contenido = `
    <img src="${imgUrl}" alt="producto" />
    <p class="consolas--consola_nombre">${nombreProducto}</p>
    <strong class="consolas--consola_precio">$ ${precio}</strong>
    <a href="screens/producto.html?id=${id}?${nombreProducto}" class="consolas--consola_link">Ver producto</a>
    `;
    listaCard.innerHTML = contenido;
    return listaCard;
};

const tituloCamiseta = document.querySelector('[data-camisetaTitulo]');
const listaCamiseta = document.querySelector('[data-camisetaList]');
const tituloFigura = document.querySelector('[data-figuraTitulo]');
const listaFigura = document.querySelector('[data-figuraList]');
const tituloConsola = document.querySelector('[data-consolaTitulo]');
const listaConsola = document.querySelector('[data-consolaList]');

clientService.listaProductos().then((data)=>{
        data.forEach(({nombre, precio, imagen, categoria, id}) => {
            switch (categoria) {
                case "Camisetas":
                  tituloCamiseta.textContent = categoria;
                  const nuevaCamiseta = cardCamisetas(nombre, precio, imagen, categoria, id);
                  listaCamiseta.appendChild(nuevaCamiseta);
                  break;
                case "Figuras":
                  tituloFigura.textContent = categoria;
                  const nuevaFigura = cardFiguras(nombre, precio, imagen, categoria, id);
                  listaFigura.appendChild(nuevaFigura);
                  break;
                case "Consolas":
                  tituloConsola.textContent = categoria;
                  const nuevaConsola = cardConsolas(nombre, precio, imagen, categoria, id);
                  listaConsola.appendChild(nuevaConsola);
                  break;
                default:
                  alert('No se encontraron productos ni coincidencias');
                  break;
              }
        });
}).catch((error)=> console.error('Ocurrio un error: ', error));