const listaUsuarios = () => fetch('http://localhost:3000/usuarios').then((respuesta) => respuesta.json());
const listaProductos = () => fetch('http://localhost:3000/productos').then((respuesta) => respuesta.json());

const login = async (email, contrasena) => {
    const respuesta = await fetch('http://localhost:3000/usuarios');
    const usuarios = await respuesta.json();
    const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email && usuario.contrasena === contrasena);
    return { autenticado: !!usuarioEncontrado };
};

const crearProducto = (nombre, precio, imagen, categoria, descripcion) => {
    return fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, precio, imagen, categoria, descripcion, id: uuid.v4()})
    });
};

const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then((respuesta) => respuesta.json());
};

const actualizarProducto = (nombre, precio, imagen, categoria, descripcion, id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, precio, imagen, categoria, descripcion}),
    }).then((respuesta) => respuesta).catch((error)=>console.log(error));
};

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE'
    });
};

const verProductoLink = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then((respuesta) => respuesta.json());
};

export const clientService = {
    login,
    listaProductos,
    crearProducto,
    detalleProducto,
    actualizarProducto,
    eliminarProducto,
    verProductoLink
};