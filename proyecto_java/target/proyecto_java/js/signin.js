document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    if (!formulario) {
        console.error('El formulario no se encontró en el DOM');
        return;
    }

    const mostrarError = (input, mensaje) => {
        const divPadre = input.parentNode;
        let errorText = divPadre.querySelector('.error-text');
        if (!errorText) {
            errorText = document.createElement('div');
            errorText.classList.add('error-text');
            errorText.style.color = 'red';
            divPadre.appendChild(errorText);
        }
        divPadre.classList.add('error');
        errorText.innerText = mensaje;
    }

    const eliminarError = input => {
        const divPadre = input.parentNode;
        divPadre.classList.remove('error');
        const errorText = divPadre.querySelector('.error-text');
        if (errorText) {
            errorText.innerText = '';
        }
    }

    formulario.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', () => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    eliminarError(input);
                }
            } else {
                if (input.value.trim() !== '') {
                    eliminarError(input);
                }
            }
        });
    });

    const validarCampo = (campoId, mensaje) => {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value === '') {
            mostrarError(campo, mensaje);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    const isEmail = email => {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
    }

    const validarEmail = (campoId, mensaje) => {
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        if (email === '') {
            mostrarError(campo, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            mostrarError(campo, mensaje);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    const validarCheckbox = (campoId, mensaje) => {
        const campo = document.getElementById(campoId);
        if (!campo.checked) {
            mostrarError(campo, mensaje);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    }

    const validarFormulario = () => {
        let esValido = true;

        esValido = validarCampo('nombre', 'El nombre es obligatorio') && esValido;
        esValido = validarCampo('apellido', 'El apellido es obligatorio') && esValido;
        esValido = validarEmail('usuario', 'El correo electrónico no es válido') && esValido;
        esValido = validarCampo('clave', 'La contraseña es obligatoria') && esValido;
        esValido = validarCampo('date', 'La fecha es obligatoria') && esValido;
        esValido = validarCampo('country', 'Debe seleccionar un país') && esValido;
        esValido = validarCheckbox('terms', 'Debe aceptar los términos y condiciones') && esValido;

        return esValido;
    }

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarFormulario()) {
            console.log('El formulario no es válido');
        } else {
            console.log('El formulario es válido');
            // Aquí puedes enviar el formulario si es necesario
        }
    });
});