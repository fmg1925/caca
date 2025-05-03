//trata de hacer un enlace de las demographics y categoria al catalogo porque seria god uwu
const parametros = new URLSearchParams(window.location.search);
const idPersonaje = parametros.get('id');

//coso del html
const imagenPersonaje= document.querySelector('.imagenPersonaje');
const detallesPersonaje = document.querySelector('.detallesPersonaje');
const estadisticas = document.querySelector('.estadisticas');
const anime = document.querySelector('.aparicionesAnime');
const manga = document.querySelector('.aparicionesManga');
if (idPersonaje) {
    fetch(`https://api.jikan.moe/v4/characters/${idPersonaje}/full`)
        .then(response => response.json())
        .then(data => {
            const Personaje = data.data;
            const img = document.createElement('img');
            const info = document.getElementById('info');
            const voz = document.getElementById('voz');
            const sobre = Personaje.about || '';
            let atributosHTML = '';
            let biografiaHTML = '';
            
            if (sobre) {
                const lineas = sobre.split('\n');
            
                lineas.forEach(linea => {
                    const lineaLimpia = linea.trim();
            
                    // Ignorar cualquier línea que empiece con "(Source:"
                    if (lineaLimpia.startsWith('(Source:')) return;
            
                    if (lineaLimpia.includes(':') && !lineaLimpia.startsWith('(')) {
                        const [clave, valor] = lineaLimpia.split(':').map(p => p.trim());
                        if (clave && valor) {
                            atributosHTML += `<li><strong>${clave}:</strong> ${valor}</li>`;
                        }
                    } else if (lineaLimpia) {
                        biografiaHTML += `<p>${lineaLimpia}</p>`;
                    }
                });
            }
            img.src=Personaje.images.jpg.image_url;
            img.alt=Personaje.name;
            
            detallesPersonaje.innerHTML=
            `
            <h4>${Personaje.name}</h4>
            <h6>(${Personaje.name_kanji})</h6>
            <hr>
            `;
            anime.innerHTML = 
            Personaje.anime?.length > 0 ? `
              <h4>Apariciones Anime</h4>
              <div class="listaAnime">
                ${Personaje.anime.map(m => `
                  <div class="itemAnime">
                    <img src="${m.anime.images.jpg.image_url}" alt="${m.anime.title}" style="width:50px; vertical-align:middle;">
                    <span>${m.anime.title}, (${m.role})</span>
                  </div>
                `).join('')}
              </div>
              <hr>
            ` : '';
            manga.innerHTML =
            `
                <ul>
                    ${Personaje.manga?.length > 0 ? Personaje.manga.map(m => `
                        <li>
                            <img src="${m.manga.images.jpg.image_url}" alt="${m.manga.title}" style="width:50px; vertical-align:middle;">
                            <span>${m.manga.title}, (${m.role})</p>
                        </li>
                    `).join('') : '<li>Desconocida</li>'}
                </ul>
                <hr>
            `;
            estadisticas.innerHTML =
            `
            <p><strong>Favorito de:</strong> ${Personaje.favorites || 'Desconocida'}</p>
            `;
            info.innerHTML = `
            <h3>Sobre el personaje</h3>
            ${atributosHTML ? `<ul>${atributosHTML}</ul>` : ''}
            ${biografiaHTML || ''}
            <hr>
        `;
        if (Personaje.voices?.length > 0) {
            Personaje.voices.forEach(actor => {
              const divActor = document.createElement('div');
              divActor.innerHTML = `
                
                  <img src="${actor.person.images.jpg.image_url}" alt="${actor.person.name}" />
                  <p>${actor.person.name}</p>
                  <p>Idioma: ${actor.language}</p>
                
              `;
              voz.appendChild(divActor);
            });
          } else {
            voz.innerHTML = '<p>No hay actores de voz disponibles.</p>';
          }
            imagenPersonaje.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del Personaje:', error));
}
if (!parametros.has("id")) {
       
    window.location.href = window.location.pathname + "?id=1";
  }
    function redirigirBusqueda() {
    const titulo = document.getElementById('buscarTitulo').value.trim(); // Obtener el valor del input
    if (titulo) {
        window.location.href = `Categorias.html?q=${encodeURIComponent(titulo)}`; // Redirigir con el parámetro de búsqueda
    }
}