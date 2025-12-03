function validarForm() {
  console.log("ValidarForm");
  const emailValido = "admin@admin.com";
  const pswValido = "admin123";

  const usrEmail = document.getElementById('id_mail').value;
  const usrPsw = document.getElementById('id_psw').value;

  let esValido = true;

  //Condicionales para validar
  if(usrEmail.length < 1) {
    mostrarError('empty_email', 'El campo email no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_email');
  }

  if(usrPsw.length < 1) {
    mostrarError('empty_psw', 'El campo password no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_psw');
  }

  if(emailValido !== usrEmail || pswValido !== usrPsw) {
    mostrarError('login_error', 'Las credenciales no son válidas');
    esValido = false;
  } else {
    ocultarError('login_error');
  }

  return esValido;

}

function mostrarError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + '_error');
  errorElement.textContent = "❌ " + message;
  errorElement.style.display = 'block';
}

function ocultarError(fieldId) {
  const errorElement = document.getElementById(fieldId + '_error');
  errorElement.style.display = 'none';
}


/*
Agregamos un listener a nuestro botón Ingresar , que al hacer click el usuario
sobre el mismo, se dispare la función de validarForm.
*/
const btnIngresar = document.getElementById('btn_login');
btnIngresar.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("Entramos en el listener");
  if (validarForm()) {
    window.location.href = "Index/bienvenida.html";
  }
})