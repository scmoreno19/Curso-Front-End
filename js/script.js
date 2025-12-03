function validarForm() {
  console.log("ValidarForm");
  const emailValido = "admin@admin.com";
  const pswValido = "admin123";

  const usrEmail = document.getElementById('id_mail').value;
  const usrPsw = document.getElementById('id_psw').value;

  let esValido = true;

  // Validación email vacío
  if (usrEmail.length < 1) {
    mostrarError('empty_email', 'El campo email no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_email');
  }

  // Validación password vacío
  if (usrPsw.length < 1) {
    mostrarError('empty_psw', 'El campo password no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_psw');
  }

  // Validación credenciales
  if (emailValido !== usrEmail || pswValido !== usrPsw) {
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

const btnIngresar = document.getElementById('btn_login');
btnIngresar.addEventListener('click', function(event) {
  event.preventDefault();
  if (validarForm()) {
    window.location.href = "pages/bienvenida.html";
  }
});
