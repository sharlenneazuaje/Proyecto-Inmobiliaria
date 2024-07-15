//Todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded',()=>{

    //seleccionamos el formulario del DOM
    const formulario = document.querySelector('form');

    // Función mostrar Error
    const mostrarError = (input,mensaje)=>{
        const divPadre = input.parentNode;
        const errorText  = divPadre.querySelector('.error-text');
        divPadre.classList.add('error');
        errorText.innerText = mensaje;
    }


    //Función Eliminar Mensaje de Error
    const eliminarError = input =>{
        const divPadre = input.parentNode;
        divPadre.classList.remove('error');
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = '';
    }

    //Función para corroborar si los campos están completos para 
    //quitar el error

    formulario.querySelectorAll('input').forEach(input =>{
        input.addEventListener('change',()=>{
            const valor = input.value.trim();
            if(valor !== ''){
                eliminarError(input);
            }    
        })
    });

    //Función validar campo
    function validarCampo(campoId,mensaje){
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if(value == ''){
            mostrarError(campo,mensaje);
            return false;
        }else{
            eliminarError(campo);
            return true;
        }
    }


    //funcion para validar un correo electrónico utilizando una expresión regular
    function isEmail(email){
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
    }

    //función para validar el email
    function validarEmail(campoId,mensaje){
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        if(email === ''){
            mostrarError(campo,'El correo electrónico es obligatorio');
            return false;
        }else if(!isEmail(email)){
            mostrarError(campo,mensaje);
            return false;
        }else{
            eliminarError(campo);
            return true;
        }
    }

    //funcion para validar el formulario
    const validarFormulario = () =>{
        let validar = true;
        
        validar = validarEmail('email', 'El correo electrónico no es válido') && validar;
        validar = validarCampo('clave', 'La contraseña es obligatoria') && validar;

        return validar;
    }

    //Evento de escucha para cuando se envía el formulario
    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if(!validarFormulario()){
            event.preventDefault();
            console.log('El formulario no es válido');
        }else{
            event.preventDefault();
            console.log('El formulario es válido');
        }
    })
})


