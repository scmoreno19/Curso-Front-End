
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      const nombre = document.querySelector("#nombre");
      const correo = document.querySelector("#correo");
      const mensaje = document.querySelector("#mensaje");

      let errores = [];

      if (!nombre.value.trim()) errores.push("El nombre es obligatorio.");
      if (!correo.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value))
        errores.push("Ingrese un correo válido.");
      if (!mensaje.value.trim()) errores.push("El mensaje no puede estar vacío.");

      if (errores.length > 0) {
        event.preventDefault();
        alert(errores.join("\n"));
      }
    });
  }
});




const contenedorProductos = document.querySelector("#productos-dinamicos");

if (contenedorProductos) {
  fetch("https://gutendex.com/books/")
    .then(res => res.json())
    .then(data => {
      const libros = data.results.slice(0, 8); // 8 productos

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



let carrito = [];
const contadorCarrito = document.querySelector("#contador-carrito");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-carrito")) {
    const card = e.target.parentElement;
    const titulo = card.querySelector("h3").textContent;
    const precio = card.querySelector(".precio").textContent;

    carrito.push({ titulo, precio });

    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }

    alert("Producto agregado al carrito: " + titulo);
  }
});
