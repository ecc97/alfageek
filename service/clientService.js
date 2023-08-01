const listaUsuarios = () => fetch('https://api-vercel-json-server.vercel.app/usuarios').then((respuesta) => respuesta.json());
const listaProductos = () => fetch('https://api-vercel-json-server.vercel.app/productos').then((respuesta) => respuesta.json());

const login = async (email, contrasena) => {
    const respuesta = await fetch('https://api-vercel-json-server.vercel.app/usuarios');
    const usuarios = await respuesta.json();
    const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email && usuario.contrasena === contrasena);
    return { autenticado: !!usuarioEncontrado };
};

const crearProducto = (nombre, precio, imagen, categoria, descripcion) => {
    return fetch('https://api-vercel-json-server.vercel.app/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, precio, imagen, categoria, descripcion, id: uuid.v4()})
    });
};

const detalleProducto = (id) => {
    return fetch(`https://api-vercel-json-server.vercel.app/productos/${id}`).then((respuesta) => respuesta.json());
};

const actualizarProducto = (nombre, precio, imagen, categoria, descripcion, id) => {
    return fetch(`https://api-vercel-json-server.vercel.app/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, precio, imagen, categoria, descripcion}),
    }).then((respuesta) => respuesta).catch((error)=>console.log(error));
};

const eliminarProducto = (id) => {
    return fetch(`https://api-vercel-json-server.vercel.app/productos/${id}`, {
        method: 'DELETE'
    });
};

const verProductoLink = (id) => {
    return fetch(`https://api-vercel-json-server.vercel.app/productos/${id}`).then((respuesta) => respuesta.json());
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