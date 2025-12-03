function validarForm() {
  const emailValido = "admin@admin.com";
  const pswValido = "admin123";

  const usrEmail = document.getElementById('id_mail').value.trim();
  const usrPsw = document.getElementById('id_psw').value.trim();

  let esValido = true;

  // Validar email vacío
  if (usrEmail.length < 1) {
    mostrarError("empty_email_error", "El campo email no puede estar vacío");
    esValido = false;
  } else {
    ocultarError("empty_email_error");
  }

  // Validar contraseña vacía
  if (usrPsw.length < 1) {
    mostrarError("empty_psw_error", "El campo password no puede estar vacío");
    esValido = false;
  } else {
    ocultarError("empty_psw_error");
  }

  // Validar credenciales
  if (usrEmail !== emailValido || usrPsw !== pswValido) {
    mostrarError("login_error_error", "Las credenciales no son válidas");
    esValido = false;
  } else {
    ocultarError("login_error_error");
  }

  return esValido;
}

function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  elemento.textContent = "❌ " + mensaje;
  elemento.style.display = "block";
}

function ocultarError(id) {
  const elemento = document.getElementById(id);
  elemento.style.display = "none";
}

// Listener del botón
const btnIngresar = document.getElementById("btn_login");

btnIngresar.addEventListener("click", function (event) {
  event.preventDefault();

  if (validarForm()) {
    window.location.href = "bienvenida.html";
  }
});
