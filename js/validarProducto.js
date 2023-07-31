const inputs = document.querySelectorAll('.inputs');
const txta = document.querySelector('.txta');
const select = document.querySelector('select');

inputs.forEach((input) => {
    input.addEventListener("blur", (evento) => {
        validaInputs(evento.target);
    });
});
txta.addEventListener("blur", (evento) => {
    validaTxta(evento.target);
});
select.addEventListener("blur", (evento) => {
    validaSelect(evento.target);
});

function validaInputs(input){
    const tipoDeInput = input.dataset.tipo;

    if (input.validity.valid) {
        input.parentElement.classList.remove('form-producto_input--invalid');
        input.parentElement.querySelector('.input-mensaje-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('form-producto_input--invalid');
        input.parentElement.querySelector('.input-mensaje-error').innerHTML = mostrarerrorMensaje(tipoDeInput, input);
    }
}
function validaTxta(textarea){
    const minLength = 1;
    const maxLength = parseInt(textarea.getAttribute('maxlength'));
    const contenido = textarea.value.trim();

    if(contenido.length >= minLength && contenido.length <= maxLength){
        textarea.parentElement.classList.remove('form-producto_textarea--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = '';
    }else if(contenido === ''){
        textarea.parentElement.classList.add('form-producto_textarea--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = 'El campo mensaje es requerido';
    }else{
        textarea.parentElement.classList.add('form-producto_textarea--invalid');
        textarea.parentElement.querySelector('.textarea-mensaje-error').innerHTML = `Tu mensaje debe contener entre ${minLength} y ${maxLength} caracteres`;
    }
}
function validaSelect(select){
    const tipoSelect = select.dataset.tipo;

    if (select.validity.valid) {
        select.parentElement.classList.remove('form-producto_select--invalid');
        select.parentElement.querySelector('.select-mensaje-error').innerHTML = '';
    } else {
        select.parentElement.classList.add('form-producto_select--invalid');
        select.parentElement.querySelector('.select-mensaje-error').innerHTML = mostrarerrorMensaje(tipoSelect, select);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
];

const mensajesdeErrores = {
    nombreProducto:{
        valueMissing: "El campo nombre es requerido",
        patternMismatch: "El nombre debe contener entre 3 a 20 caracteres",
    },
    precio:{
        valueMissing: "El campo precio es requerido",
        patternMismatch: "Solo se aceptan números",
    },
    url:{
        valueMissing: "El campo URL es requerido",
        typeMismatch: "Introduce una URL completa",
    },
    categoria:{
        valueMissing: "El campo categoría es requerido",
    }
};

function mostrarerrorMensaje(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesdeErrores[tipoDeInput][error];
        }
    })
    return mensaje
}