    document.addEventListener("DOMContentLoaded", function () {
      const ListaPopulares = document.querySelector('.ListaPopulares.mangas');
      const PopularesPersonaje = document.querySelector('.ListaPopulares.personajes');
      let currentPage = 1;
  
      function cargarPopularesManga(page) {
        ListaPopulares.innerHTML += '<p id="cargando">Cargando...</p>';
  
        fetch(`https://api.jikan.moe/v4/top/manga?page=${page}&limit=5`)
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
            } 
          })
          .catch(error => {
            console.error('Error:', error);
            ListaPopulares.innerHTML += '<p>Error al cargar los mangas populares.</p>';
          });
      }
      // Cargar la primera página al iniciar
      cargarPopularesManga(currentPage);


    //Funcion cargar personajes populares
    function cargarPersonajes(page) {
      PopularesPersonaje.innerHTML += '<p id="cargandos">Cargando...</p>';

      fetch(`https://api.jikan.moe/v4/top/characters?page=${page}&limit=5`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('cargandos')?.remove();

          if (data.data && data.data.length > 0) {
            data.data.forEach(character => {
              const personajes = document.createElement('div');
              personajes.classList.add('Popular');

              personajes.innerHTML = `
                  <a href="${character.url}" target="_blank">
                  <img src="${character.images.jpg.image_url}" alt="" />
                  <p class="Nombre">${character.name}</p>
                  </a>
                  <p class="Seguidores">Gente a sus pies #${character.favorites}</p>
              `;

              PopularesPersonaje.appendChild(personajes);
            });
          } 
        })
        .catch(error => {
          console.error('Error:', error);
          ListaPopulares.innerHTML += '<p>Error al cargar los mangas populares.</p>';
        });
    }
    // Cargar la primera página al iniciar
    cargarPersonajes(currentPage);
  });