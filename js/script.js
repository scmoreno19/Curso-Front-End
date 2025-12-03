document.addEventListener("DOMContentLoaded", function () {

  /* ---------- LOGIN (EASY) ---------- */
  const btnLogin = document.getElementById("btn_login");
  if (btnLogin) {
    btnLogin.addEventListener("click", function (ev) {
      ev.preventDefault();

      const emailEl = document.getElementById("id_mail");
      const pswEl = document.getElementById("id_psw");
      const resultEl = document.getElementById("resultado");

      // valores seguros
      const emailValido = "admin@admin.com";
      const pswValido = "admin123";

      const email = emailEl ? emailEl.value.trim() : "";
      const psw = pswEl ? pswEl.value.trim() : "";

      // limpiar errores
      hideError("email_error");
      hideError("psw_error");
      hideError("login_error");
      if (resultEl) resultEl.textContent = "";

      let ok = true;

      if (!email) {
        showError("email_error", "El email no puede estar vacío");
        ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email_error", "Formato de email inválido");
        ok = false;
      }

      if (!psw) {
        showError("psw_error", "La contraseña no puede estar vacía");
        ok = false;
      } else if (psw.length < 6) {
        showError("psw_error", "La contraseña debe tener al menos 6 caracteres");
        ok = false;
      }

      if (ok) {
        if (email !== emailValido || psw !== pswValido) {
          showError("login_error", "Credenciales incorrectas");
          ok = false;
        }
      }

      if (ok) {
        if (resultEl) resultEl.textContent = "✔ Envío exitoso";
        // Si querés redireccionar, descomentá la siguiente línea y crea Index/bienvenida.html
        // window.location.href = "Index/bienvenida.html";
      }
    });
  }

  /* ---------- VALIDACIÓN SIMPLE CONTACTO ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const name = document.getElementById("c_nombre").value.trim();
      const email = document.getElementById("c_email").value.trim();
      const msg = document.getElementById("c_mensaje").value.trim();
      const errorsEl = document.getElementById("contact_errors");
      const successEl = document.getElementById("contact_success");
      if (errorsEl) errorsEl.textContent = "";
      if (successEl) successEl.textContent = "";

      const errors = [];
      if (name.length < 2) errors.push("Nombre: mínimo 2 caracteres.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email inválido.");
      if (msg.length < 10) errors.push("Mensaje: mínimo 10 caracteres.");

      if (errors.length) {
        if (errorsEl) errorsEl.textContent = errors.join(" - ");
      } else {
        if (successEl) successEl.textContent = "✔ Envío exitoso (simulado)";
        // Aquí podrías hacer fetch() para envío real
        contactForm.reset();
      }
    });
  }

  /* ---------- helpers ---------- */
  function showError(id, text) {
    const el = document.getElementById(id);
    if (el) { el.textContent = "❌ " + text; el.style.display = "block"; }
  }
  function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

}); // DOMContentLoaded end
