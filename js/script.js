/* =============================
   VALIDACIÓN DE FORMULARIOS
============================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {

      // Detectar qué formulario estás usando
      const nombre = document.querySelector("#nombre"); // contacto.html
      const correo = document.querySelector("#correo");
      const mensaje = document.querySelector("#mensaje");

      const titulo = document.querySelector("#titulo"); // libros.html
      const tipo = document.querySelector("#tipo");
      const contacto = document.querySelector("#contacto");

      let errores = [];

      // FORMULARIO DE CONTACTO
      if (nombre && correo && mensaje) {
        if (!nombre.value.trim()) errores.push("El nombre es obligatorio.");
        if (!correo.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value))
          errores.push("Ingrese un correo válido.");
        if (!mensaje.value.trim()) errores.push("El mensaje no puede estar vacío.");
      }

      // FORMULARIO DE SUBIR LIBRO
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
   FETCH API: CARGA DE PRODUCTOS
============================= */

const contenedorProductos = document.querySelector("#productos-dinamicos");

if (contenedorProductos) {
  fetch("https://gutendex.com/books/")
    .then(res => res.json())
    .then(data => {
      const libros = data.results.slice(0, 8);

      libros.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${libro.formats["image/jpeg"] || "../img/no-image.png"}" alt="${libro.title}">
          <h3>${libro.title}</h3>
          <p class="precio">$${(Math.random() * 45 + 5).toFixed(2)}</p>
          <button class="btn-carrito">Agregar al carrito</button>
        `;

        contenedorProductos.appendChild(card);
      });
    })
    .catch(error => {
      contenedorProductos.innerHTML = "<p>Error al cargar los productos.</p>";
      console.error(error);
    });
}


/* =============================
   CARRITO CON PANEL DESPLEGABLE
============================= */

let carrito = [];
const contadorCarrito = document.querySelector("#contador-carrito");
const carritoPanel = document.querySelector("#carrito-panel");
const itemsCarrito = document.querySelector("#items-carrito");

/* ABRIR CARRITO */
document.querySelector(".carrito").addEventListener("click", () => {
  carritoPanel.classList.add("visible");
});

/* CERRAR CARRITO */
document.querySelector("#cerrar-carrito").addEventListener("click", () => {
  carritoPanel.classList.remove("visible");
});

/* VACIAR CARRITO */
document.querySelector("#vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

/* AGREGAR PRODUCTOS */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-carrito")) {
    const card = e.target.closest(".card");
    const titulo = card.querySelector("h3").textContent;
    const precio = card.querySelector(".precio").textContent;

    carrito.push({ titulo, precio });
    actualizarCarrito();
  }
});

/* ACTUALIZA NÚMERO Y LISTA */
function actualizarCarrito() {
  contadorCarrito.textContent = carrito.length;

  itemsCarrito.innerHTML = carrito
    .map(item => `<div><strong>${item.titulo}</strong><br>${item.precio}</div>`)
    .join("");

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
  }
}

