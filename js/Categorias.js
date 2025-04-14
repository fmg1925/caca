
    // Leer parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');

    const main = document.querySelector('main');

    // Títulos personalizados
    const titulos = {
        populares: "Mangas Populares ✨",
        accion: "Mangas de Acción 💥",
        Comedia: "Mangas de Comedia 😂",
        Romance: "Mangas de Romance 💖",
        Aventura: "Mangas de Aventura 🌍",
        Isekai: "Mangas Isekai 🌌",
        emisión: "Mangas en Emisión 📺",
        Finalizados: "Mangas Finalizados ✅",
        Favoritos: "Favoritos del Público 🩵"
    };

    // Si existe la categoría, mostramos contenido
    if (categoria && titulos[categoria]) {
        main.innerHTML = `
            <div class="Peo">
                <p>${titulos[categoria]}</p>
            </div>
            <div class="contenedorImagenes">
                <div class="mangafoto">
                    <p class="Titulo">Aquí irían mangas de "${titulos[categoria]}"</p>
                </div>
            </div>
        `;
    } else {
        // Si la categoría no existe o es incorrecta
        main.innerHTML = `
            <div class="Peo">
                <p>¡Categoría no encontrada!</p>
            </div>
        `;
    }

