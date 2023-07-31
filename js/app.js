function irConsolas() {
    const consola = document.getElementById('consolas');
    const seccionConsola = document.getElementById('seccion-consola');
    
    consola.addEventListener('click', function(e){
        e.preventDefault();
        seccionConsola.scrollIntoView({ behavior: 'smooth' });
    }) 
}
irConsolas();
function irLogin(){
    const btnLogin = document.getElementById('login-btn');
    
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'screens/login.html';
    })
}
irLogin();

function verProductos(){
    const verTodo = document.getElementsByClassName('verTodo');
    
    for (let index = 0; index < verTodo.length; index++) {
        verTodo[index].addEventListener('click', (e) => {
            e.preventDefault();
            window.location.reload();
            window.location.href = 'screens/productos.html'
        }) 
    }
}
verProductos();
