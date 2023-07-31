import { clientService } from "../service/clientService.js";

const eliminarProducto = (id) => {
    let alertaConfirm = confirm('¿Deseas eliminar este producto?');

    if(alertaConfirm){
        clientService.eliminarProducto(id)
          .then((respuesta) => {
            console.log(respuesta);
            window.location.reload();
          })
          .catch((error) => alert('Ocurrió un error'));
    }
  };
  
  export { eliminarProducto };
