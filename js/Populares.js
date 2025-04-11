    document.addEventListener("DOMContentLoaded", function () {
      const ListaPopulares = document.querySelector('.ListaPopulares');
      let currentPage = 1;
  
      function cargarPopulares(page) {
        ListaPopulares.innerHTML += '<p id="cargando">Cargando...</p>';
  
        fetch(`https://api.jikan.moe/v4/top/manga?page=${page}&limit=4`)
          .then(response => response.json())
          .then(data => {
            document.getElementById('cargando')?.remove();
  
            if (data.data && data.data.length > 0) {
              data.data.forEach(manga => {
                const Popular = document.createElement('div');
                Popular.classList.add('Popular');
  
                Popular.innerHTML = `
                    <a href="${manga.url}" target="_blank">
                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                    <p>${manga.title}</p>
                    </a>
                `;
  
                ListaPopulares.appendChild(Popular);
              });
            } else {
              ListaPopulares.innerHTML += '<p>No hay más mangas para mostrar.</p>';
              verMasBtn.disabled = true;
            }
          })
          .catch(error => {
            console.error('Error:', error);
            ListaPopulares.innerHTML += '<p>Error al cargar los mangas populares.</p>';
          });
      }
      // Cargar la primera página al iniciar
      cargarPopulares(currentPage);
    });