/* ============================================================
   ================   MANEJO DEL CARRITO   =====================
   ============================================================ */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* --- Actualiza contador en todas las páginas --- */
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = carrito.length;
}
actualizarContador();

/* --- Agregar al carrito --- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {

        const titulo = e.target.dataset.titulo;
        const precio = parseInt(e.target.dataset.precio);

        carrito.push({ titulo, precio });

        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarContador();
        alert("Libro agregado al carrito ❤️");
    }
});

/* --- Mostrar carrito en Carrito.html --- */
function mostrarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const totalElem = document.getElementById("total");

    if (!contenedor || !totalElem) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        contenedor.innerHTML += `
            <div class="carrito-item">
                <span>${item.titulo}</span>
                <span>$${item.precio}</span>
                <button class="btn-eliminar" data-index="${index}">X</button>
            </div>
        `;
    });

    totalElem.textContent = total;
}

mostrarCarrito();

/* --- Eliminar individual --- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;

        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
        actualizarContador();
    }
});

/* --- Vaciar carrito --- */
const btnVaciar = document.getElementById("vaciar");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
        actualizarContador();
    });
}

/* ============================================================
   ================  VALIDACIÓN FORMULARIO  ====================
   ============================================================ */

function validarFormulario() {
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const errores = document.getElementById("errores");

    let mensajes = "";

    errores.innerHTML = "";

    if (nombre.value.trim() === "") mensajes += "<p>• El nombre es obligatorio</p>";
    if (!email.value.includes("@")) mensajes += "<p>• El email no es válido</p>";
    if (mensaje.value.length < 10) mensajes += "<p>• El mensaje debe tener al menos 10 caracteres</p>";

    if (mensajes !== "") {
        errores.innerHTML = mensajes;
        errores.style.color = "red";
        return false;
    }

    errores.innerHTML = "<p style='color:green'>✔ Envío exitoso</p>";
    return true;
}
