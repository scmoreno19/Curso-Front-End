/* =============================
   VALIDACIÓN DE FORMULARIOS
============================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      let errores = [];

      const nombre = document.querySelector("#nombre");
      const correo = document.querySelector("#correo");
      const mensaje = document.querySelector("#mensaje");

      const titulo = document.querySelector("#titulo");
      const tipo = document.querySelector("#tipo");
      const contacto = document.querySelector("#contacto");

      // FORMULARIO DE CONTACTO
      if (nombre && correo && mensaje) {
        if (!nombre.value.trim()) errores.push("El nombre es obligatorio.");
        if (!correo.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value))
          errores.push("Ingrese un correo válido.");
        if (!mensaje.value.trim()) errores.push("El mensaje no puede estar vacío.");
      }

      // FORMULARIO SUBIR LIBRO
      if (titulo && tipo && contacto) {
        if (!titulo.value.trim()) errores.push("Debe ingresar el título del libro.");
        if (!tipo.value) errores.push("Debe elegir si es venta o intercambio.");
        if (!contacto.value.trim()) errores.push("Debe ingresar un medio de contacto.");
      }

      if (errores.length > 0) {
        event.preventDefault();
        alert(errores.join("\n"));
      }
    });
  }
});


/* =============================
FETCH API – CARGA DE PRODUCTOS
============================= */

const contenedor = document.querySelector(".libros-grid");

if (contenedor) {
  fetch("https://gutendex.com/books/")
    .then(res => res.json())
    .then(data => {
      const libros = data.results.slice(0, 8);

      libros.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("card"); // ← CORREGIDO, antes card-libro

        card.innerHTML = `
          <img src="${libro.formats["image/jpeg"] || "./img/no-image.png"}" alt="${libro.title}">
          <h3>${libro.title}</h3>
          <p class="precio">$${(Math.random() * 45 + 5).toFixed(2)}</p>
          <button class="btn-agregar">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => console.error("Error cargando libros:", error));
}



/* =============================
          CARRITO
============================= */

let carrito = [];

const contadorCarrito = document.querySelector("#contador-carrito");
const itemsCarrito = document.querySelector("#items-carrito");
const carritoPanel = document.querySelector("#carrito");

/* ABRIR */
document.getElementById("iconoCarrito")?.addEventListener("click", () => {
  carritoPanel.classList.add("visible");
});

/* CERRAR */
document.getElementById("cerrarCarrito")?.addEventListener("click", () => {
  carritoPanel.classList.remove("visible");
});

/* VACIAR */
document.getElementById("vaciar-carrito")?.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

/* AGREGAR DESDE CUALQUIER CARD */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const card = e.target.closest(".card");
    const titulo = card.querySelector("h3").textContent;
    const precio = card.querySelector(".precio").textContent;

    carrito.push({ titulo, precio });
    actualizarCarrito();
  }
});

/* ACTUALIZAR CONTENIDO */
function actualizarCarrito() {
  contadorCarrito.textContent = carrito.length;

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  itemsCarrito.innerHTML = carrito
    .map(item => `
      <div class="item-carrito">
        <strong>${item.titulo}</strong><br>${item.precio}
      </div>
    `)
    .join("");
}
