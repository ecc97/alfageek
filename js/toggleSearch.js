function toggleBuscar(){
    const toggleBtn = document.querySelector('.btn-buscar-ocul');
    const cajaInputBuscar = document.querySelector('.nav-caja--busqueda');
    
    toggleBtn.addEventListener('click', () => {
      cajaInputBuscar.classList.toggle('active');
      if (cajaInputBuscar.classList.contains('active')) {
        cajaInputBuscar.focus();
      }
    });
}

toggleBuscar();