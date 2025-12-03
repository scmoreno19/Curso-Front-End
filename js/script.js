function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const errores = document.getElementById("errores");

    errores.innerHTML = "";

    let mensajes = [];

    if (nombre.length < 3) {
        mensajes.push("El nombre debe tener al menos 3 caracteres.");
    }

    if (!email.includes("@") || !email.includes(".")) {
        mensajes.push("El email no es válido.");
    }

    if (mensaje.length < 10) {
        mensajes.push("El mensaje debe tener al menos 10 caracteres.");
    }

    if (mensajes.length > 0) {
        errores.innerHTML = mensajes.join("<br>");
        errores.classList.add("error-box");
        return false;
    }

    errores.innerHTML = "<strong>Envío exitoso ✔</strong>";
    errores.classList.add("ok-box");
    return false;
}
