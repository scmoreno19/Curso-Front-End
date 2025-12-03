function validarForm() {
    const emailValido = "admin@admin.com";
    const pswValido = "admin123";

    const usrEmail = document.getElementById("id_mail").value.trim();
    const usrPsw = document.getElementById("id_psw").value.trim();

    let valido = true;

    ocultarError("email");
    ocultarError("psw");
    ocultarError("login");

    if (usrEmail === "") {
        mostrarError("email", "El email no puede estar vacío");
        valido = false;
    }

    if (usrPsw === "") {
        mostrarError("psw", "La contraseña no puede estar vacía");
        valido = false;
    }

    if (valido && (usrEmail !== emailValido || usrPsw !== pswValido)) {
        mostrarError("login", "Credenciales incorrectas");
        valido = false;
    }

    return valido;
}

function mostrarError(id, mensaje) {
    const e = document.getElementById(id + "_error");
    e.textContent = "❌ " + mensaje;
    e.style.display = "block";
}

function ocultarError(id) {
    const e = document.getElementById(id + "_error");
    e.style.display = "none";
}

document.getElementById("btn_login").addEventListener("click", function (event) {
    event.preventDefault();

    if (validarForm()) {
        document.getElementById("resultado").textContent = "✔ Envío exitoso";

        // OPCIONAL:
        // window.location.href = "bienvenida.html";
    }
});
