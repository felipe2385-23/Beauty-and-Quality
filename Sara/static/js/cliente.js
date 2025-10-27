document.addEventListener("DOMContentLoaded", () => {
    const productosGrid = document.getElementById("productosGrid");
    const favoritesCount = document.getElementById("favoritesCount");
    const searchInput = document.getElementById("searchInput"); // 🔍 Campo de búsqueda

    // Crear botones principales
    const btnVerFavoritos = document.createElement("button");
    btnVerFavoritos.textContent = "💖 Ver Favoritos";
    btnVerFavoritos.classList.add("btn-favoritos");

    const btnVolver = document.createElement("button");
    btnVolver.textContent = "⬅️ Volver a Todos";
    btnVolver.classList.add("btn-volver");
    btnVolver.style.display = "none";

    const container = document.querySelector(".page-header");
    container.appendChild(btnVerFavoritos);
    container.appendChild(btnVolver);

    // Lista de favoritos (localStorage)
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // 🔹 Actualizar contador
    function actualizarContador() {
        favoritesCount.textContent = favoritos.length;
    }

    // 🔹 Actualizar botones de favoritos
    function actualizarBotonesFavorito() {
        document.querySelectorAll(".btn-favorito").forEach(btn => {
            const id = btn.dataset.id;
            const heart = btn.querySelector(".heart");
            const text = btn.querySelector(".text");

            if (favoritos.includes(id)) {
                btn.classList.add("favorito");
                heart.textContent = "❌";
                text.textContent = "Quitar";
            } else {
                btn.classList.remove("favorito");
                heart.textContent = "💖";
                text.textContent = "Me gusta";
            }
        });
    }

    // 🔹 Clic en botón favorito
    productosGrid.addEventListener("click", e => {
        if (e.target.closest(".btn-favorito")) {
            const btn = e.target.closest(".btn-favorito");
            const id = btn.dataset.id;

            if (favoritos.includes(id)) {
                favoritos = favoritos.filter(fav => fav !== id);

                // Si estamos viendo favoritos, ocultar de inmediato
                if (btnVerFavoritos.disabled) {
                    btn.closest(".producto-card").style.display = "none";
                    mostrarMensajeSiVacio();
                }
            } else {
                favoritos.push(id);
            }

            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            actualizarBotonesFavorito();
            actualizarContador();
        }
    });

    // 🔹 Mostrar solo favoritos
    btnVerFavoritos.addEventListener("click", () => {
        const productos = document.querySelectorAll(".producto-card");
        productos.forEach(p => {
            const id = p.querySelector(".btn-favorito").dataset.id;
            p.style.display = favoritos.includes(id) ? "block" : "none";
        });

        btnVerFavoritos.style.display = "none";
        btnVerFavoritos.disabled = true;
        btnVolver.style.display = "inline-block";

        mostrarMensajeSiVacio();
    });

    // 🔹 Volver a todos los productos
    btnVolver.addEventListener("click", () => {
        const productos = document.querySelectorAll(".producto-card");
        productos.forEach(p => (p.style.display = "block"));

        btnVerFavoritos.style.display = "inline-block";
        btnVerFavoritos.disabled = false;
        btnVolver.style.display = "none";

        const mensaje = document.querySelector(".mensaje-favoritos-vacio");
        if (mensaje) mensaje.remove();

        actualizarBotonesFavorito();
        searchInput.value = ""; // limpiar búsqueda al volver
    });

    // 🔹 Mostrar mensaje si no hay favoritos
    function mostrarMensajeSiVacio() {
        const mensajeExistente = document.querySelector(".mensaje-favoritos-vacio");
        if (mensajeExistente) mensajeExistente.remove();

        const visibles = [...document.querySelectorAll(".producto-card")]
            .filter(p => p.style.display !== "none");

        if (visibles.length === 0) {
            const mensaje = document.createElement("div");
            mensaje.classList.add("mensaje-favoritos-vacio");
            mensaje.innerHTML = `
                <div class="mensaje-contenido">
                    <span class="empty-icon">🛍️</span>
                    <h3>No tienes productos favoritos</h3>
                    <p>Agrega algunos tocando 💖 en el catálogo</p>
                </div>
            `;
            productosGrid.insertAdjacentElement("afterend", mensaje);
        }
    }

    // 🔍 🔹 Búsqueda de productos (por nombre o descripción)
    searchInput.addEventListener("input", e => {
        const texto = e.target.value.toLowerCase().trim();
        const productos = document.querySelectorAll(".producto-card");

        productos.forEach(p => {
            const nombre = p.querySelector(".producto-nombre").textContent.toLowerCase();
            const descripcion = p.querySelector(".producto-descripcion").textContent.toLowerCase();
            const coincide = nombre.includes(texto) || descripcion.includes(texto);

            // Si está en vista de favoritos, filtrar solo dentro de ellos
            const id = p.querySelector(".btn-favorito").dataset.id;
            const esFavorito = favoritos.includes(id);
            const mostrar =
                btnVerFavoritos.disabled ? esFavorito && coincide : coincide;

            p.style.display = mostrar ? "block" : "none";
        });

        // Mostrar mensaje si no hay coincidencias
        const visibles = [...document.querySelectorAll(".producto-card")].filter(
            p => p.style.display !== "none"
        );
        const mensaje = document.querySelector(".mensaje-favoritos-vacio");
        if (mensaje) mensaje.remove();

        if (visibles.length === 0) {
            const msg = document.createElement("div");
            msg.classList.add("mensaje-favoritos-vacio");
            msg.innerHTML = `
                <div class="mensaje-contenido">
                    <span class="empty-icon">🔎</span>
                    <h3>No hay productos que coincidan</h3>
                    <p>Prueba con otro término</p>
                </div>
            `;
            productosGrid.insertAdjacentElement("afterend", msg);
        }
    });

    // Inicializar estado
    actualizarBotonesFavorito();
    actualizarContador();
});
