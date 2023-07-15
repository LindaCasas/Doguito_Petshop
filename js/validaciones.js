/*const inputNacimiento =document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (event) =>{
    validarNacimiento(event.target);
})*/

export function validar(input){
    const tipoDelInput=input.dataset.tipo; // 'input.dataset.tipo' para ver el tipo de input que es en el HTML

    if(validadores[tipoDelInput]){
        validadores[tipoDelInput](input);
    }

    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");//para eliminar una clase en los input del HTML, el cual contiene los estilos del CSS
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }
    else{
        input.parentElement.classList.add("input-container--invalid"); //para crear una nueva clase en los input del HTML, el cual agarre los estilos del CSS
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDelInput, input);//para colocar el mensaje de error desde JS a HTML
    }

}

//Arreglo para almacenar los tipos de errores del input
const tipoErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

//objeto para los mensajes de error de los inputs
const mensajesDeError={
    nombre:{
        valueMissing:"El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing:"El campo correo no puede estar vacio",
        typeMismatch:"El correo no es valido",
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un numero y no puede contener caracteres especiales",
    },
    nacimiento:{
        valueMissing:"El campo fecha no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing:"El campo número telefónico no puede estar vacio",
        patternMismatch:"El formato requerido es xxxxxxxxxx entre 8 a 10 numeros",
    },
    direccion:{
        valueMissing:"El campo dirección no puede estar vacio",
        patternMismatch:"La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad:{
        valueMissing:"El campo ciudad no puede estar vacio",
        patternMismatch:"La ciudad debe contener entre 4 a 30 caracteres",
    },
    estado:{
        valueMissing:"El campo estado no puede estar vacio",
        patternMismatch:"La estado debe contener entre 4 a 30 caracteres",
    },

};

//objeto para almacenar los distintos tipos de inputs del HTML
const validadores={
    nacimiento: (input) => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoInput, input){
    let mensaje="";
    tipoErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoInput][error]);
            mensaje=mensajesDeError[tipoInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input){
    const fechaUsuario=new Date(input.value);
    let mensaje="";
    if (!mayorEdad(fechaUsuario)){
        mensaje="Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje); //'setCustomValidity' para enviar un mensaje al formulario de HTML
}

function mayorEdad(fecha){
    const fechaActual = new Date(); //para obtener la fecha actual desde el computador
    const diferenciaFechas=new Date(
        fecha.getUTCFullYear() +18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    //console.log(fecha+"\n"+ fechaActual); //para salto de linea en JS
    return(diferenciaFechas <= fechaActual);
}



