const formulario = document.getElementById('formularioContacto');
const input = document.getElementById('nombre');
const textarea = document.getElementById('msg');

input.addEventListener('blur', (evento) => {
    validaInput(evento.target);
});

textarea.addEventListener('blur', (evento) => {
    validaTextarea(evento.target);
});

function validaInput(input){
    const tipoEntrada = input.dataset.tipo;

    if(input.validity.valid){
        input.parentElement.classList.remove('form-cont_input-label--invalid');
        input.parentElement.querySelector('.input-mensaje-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('form-cont_input-label--invalid');
        input.parentElement.querySelector('.input-mensaje-error').innerHTML = mostrarMensajeError(tipoEntrada, input);
    }
}

function validaTextarea(textarea){
    const minLength = 4;
    const maxLength = parseInt(textarea.getAttribute('maxlength'));
    const contenido = textarea.value.trim();

    if(contenido.length >= minLength && contenido.length <= maxLength){
        textarea.parentElement.classList.remove('form-cont_textarea-label--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = '';
    }else if(contenido === ''){
        textarea.parentElement.classList.add('form-cont_textarea-label--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = 'Este campo mensaje no puede estar vacío';
    }else{
        textarea.parentElement.classList.add('form-cont_textarea-label--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = `Tu mensaje debe contener entre ${minLength} y ${maxLength} caracteres`;
    }
}

const errorTipo = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
];

const mensajeError = {
    nombre: {
        valueMissing: 'Este campo nombre no puede estar vacío',
        typeMismatch: 'El nombre no es válido',
        patternMismatch: 'Tu nombre debe contener entre 3 a 40 caracteres',
    },
};

function mostrarMensajeError(tipoEntrada, input) {
    let mensaje = '';
    errorTipo.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajeError[tipoEntrada][error];
        }
    })
    return mensaje
}

formulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    let todoValido = true;
    let completado = document.querySelector('#completado');
    console.log(completado)

    if(!input.validity.valid){
        todoValido = false;
    }

    if(!textarea.validity.valid){
        todoValido = false;
    }

    if(todoValido){
        completado.innerHTML = 'Acción completada y exitosa';
        completado.style.display = 'block';
        setTimeout( function () {formulario.submit();}, 1000);
    }
})
