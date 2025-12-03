// script.js - versión robusta para tu estructura (Curso/js/script.js)

document.addEventListener("DOMContentLoaded", () => {

  // --- helpers LocalStorage ---
  const LS_KEY = "carrito_booktify";
  function readCart() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(LS_KEY, JSON.stringify(cart));
  }

  // --- estado ---
  let carrito = readCart();

  // --- actualizar contador (header en todas las páginas) ---
  function updateCounter() {
    const el = document.getElementById("contador-carrito");
    if (el) el.textContent = carrito.length;
  }
  updateCounter();

  // --- función para parsear precio (acepta "$1500", "1500", etc.) ---
  function parsePrice(text) {
    if (!text && text !== 0) return 0;
    const num = String(text).replace(/[^\d.,-]/g, "").replace(",", "");
    return Number(num) || 0;
  }

  // --- agregar producto al carrito (desde cualquier card) ---
  function addToCartFromCard(card) {
    if (!card) return;
    // Intentar obtener info del boton (data) o del contenido de la card
    const btn = card.querySelector(".btn-agregar");
    let titulo = btn && btn.dataset && btn.dataset.titulo ? btn.dataset.titulo : null;
    let precio = btn && btn.dataset && btn.dataset.precio ? parseFloat(btn.dataset.precio) : null;

    if (!titulo) {
      const h3 = card.querySelector("h3");
      titulo = h3 ? h3.textContent.trim() : "Producto";
    }
    if (precio === null) {
      const p = card.querySelector(".precio");
      precio = p ? parsePrice(p.textContent) : 0;
    }

    carrito.push({ titulo, precio });
    saveCart(carrito);
    updateCounter();
    // feedback visual
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Agregado ✓";
      btn.disabled = true;
      setTimeout(()=>{ btn.textContent = original; btn.disabled = false; }, 900);
    } else {
      alert(`Agregado: ${titulo}`);
    }
  }

  // --- Delegación de clicks: agregar al carrito, eliminar en carrito, vaciar ---
  document.addEventListener("click", (e) => {
    const t = e.target;

    // BOTÓN AGREGAR (en libros.html o cards dinámicas)
    if (t.matches(".btn-agregar")) {
      const card = t.closest(".card") || t.closest(".libro-card");
      addToCartFromCard(card);
      return;
    }

    // Eliminar item (en la página Carrito)
    if (t.matches(".btn-eliminar")) {
      const idx = Number(t.dataset.index);
      if (!Number.isNaN(idx)) {
        carrito.splice(idx, 1);
        saveCart(carrito);
        renderCartIfOnPage();
        updateCounter();
      }
      return;
    }

    // Vaciar carrito (botón con id "vaciar" o "vaciar-carrito")
    if (t.matches("#vaciar") || t.matches("#vaciar-carrito")) {
      carrito = [];
      saveCart(carrito);
      renderCartIfOnPage();
      updateCounter();
      return;
    }
  });

  // --- Render carrito en la página Carrito.html ---
  function renderCartIfOnPage() {
    // Algunos HTML usan id="lista-carrito", otros "items-carrito" - soportamos ambos
    const container = document.getElementById("lista-carrito") || document.getElementById("items-carrito");
    const totalEl = document.getElementById("total") || document.getElementById("carrito-total");

    if (!container) return; // no estamos en la página carrito

    container.innerHTML = "";

    if (!carrito.length) {
      container.innerHTML = "<p>El carrito está vacío</p>";
      if (totalEl) totalEl.textContent = "0";
      return;
    }

    let total = 0;

    carrito.forEach((item, i) => {
      total += Number(item.precio) || 0;
      const div = document.createElement("div");
      div.className = "carrito-item";
      div.innerHTML = `
        <div class="titulo">${item.titulo}</div>
        <div class="precio">$${Number(item.precio).toFixed(0)}</div>
        <button class="btn-eliminar" data-index="${i}">Eliminar</button>
      `;
      container.appendChild(div);
    });

    if (totalEl) totalEl.textContent = total.toFixed(0);
  }

  // Llamar al render si estamos en la página carrito (o donde exista contenedor)
  renderCartIfOnPage();

  // --- CARGA DINÁMICA DE LIBROS (Fetch) ---
  // Tu libros.html pone <section id="api-products" class="libros-grid"></section>
  const apiContainer = document.getElementById("api-products");
  if (apiContainer) {
    fetch("https://gutendex.com/books/")
      .then(r => r.json())
      .then(data => {
        const items = data.results.slice(0, 8);
        items.forEach(b => {
          const div = document.createElement("div");
          div.className = "card";
          const img = b.formats["image/jpeg"] || b.formats["image/png"] || "../img/no-image.png";
          const price = Math.round(Math.random() * 2000 + 300);
          div.innerHTML = `
            <img src="${img}" alt="${b.title}">
            <h3>${b.title}</h3>
            <p class="precio">$${price}</p>
            <button class="btn-agregar">Agregar al carrito</button>
          `;
          apiContainer.appendChild(div);
        });
      })
      .catch(err => {
        console.warn("Fetch falló, no se cargaron libros externos:", err);
      });
  }

  // --- Validación de contacto (si existe un form con id contact-form o form[action*='formspree']) ---
  const contactForm = document.querySelector("form[action*='formspree']") || document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (ev) => {
      // buscá inputs por id o por name
      const nameInput = contactForm.querySelector("#nombre") || contactForm.querySelector("input[name='nombre']");
      const emailInput = contactForm.querySelector("#email") || contactForm.querySelector("input[type='email']");
      const messageInput = contactForm.querySelector("#mensaje") || contactForm.querySelector("textarea[name='mensaje']");

      let errors = [];
      if (nameInput && nameInput.value.trim().length < 2) errors.push("Nombre: mínimo 2 caracteres.");
      if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) errors.push("Email inválido.");
      if (messageInput && messageInput.value.trim().length < 10) errors.push("Mensaje: mínimo 10 caracteres.");

      // mostrar mensajes en un contenedor #errores si existe, sino alert
      const erroresBox = contactForm.querySelector("#errores");
      if (errors.length) {
        ev.preventDefault();
        if (erroresBox) {
          erroresBox.innerHTML = errors.map(x => `<p>• ${x}</p>`).join("");
          erroresBox.style.color = "red";
        } else {
          alert(errors.join("\n"));
        }
      } else {
        // envío exitoso: mostrar mensaje (no prevenir submit para que Formspree lo envíe)
        if (erroresBox) {
          erroresBox.innerHTML = "<p style='color:green'>✔ Envío exitoso</p>";
        }
        // opcional: si usás AJAX, podés prevenir y enviar con fetch. Acá dejamos que Formspree haga el envío.
      }
    });
  }

}); // DOMContentLoaded end
