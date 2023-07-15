import { validar } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); //para llamar a todos los imputs del HTML

//para iterar los inputs
inputs.forEach(input =>{
    input.addEventListener("blur", (input) =>{
        validar(input.target);
    });
});







