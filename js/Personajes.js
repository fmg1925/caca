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
            const biografiaLimpia = Personaje.about.replace(/\r?\n/g, '\n'); // Normalizar saltos de línea
            const [atributos, ...resto] = biografiaLimpia.split('\n\n'); // Primer bloque = atributos
            const bioFormateada = resto.map(parrafo => `<p>${parrafo.trim()}</p>`).join('');
            
            img.src=Personaje.images.jpg.image_url;
            img.alt=Personaje.name;
            
            detallesPersonaje.innerHTML=
            `
            <h4>${Personaje.name}</h4>
            <h6>(${Personaje.name_kanji})</h6>
            <hr>
            `;
            anime.innerHTML =
            `${Personaje.anime?.length > 0 ? `
                <h4>Apariciones Anime:</h4>
                <ul>
                    ${Personaje.anime.map(m => `
                        <li>
                            <img src="${m.anime.images.jpg.image_url}" alt="${m.anime.title}" style="width:50px; vertical-align:middle;">
                            <span>${m.anime.title}, (${m.role})</span>
                        </li>
                    `).join('')}
                </ul>
                <hr>
            ` : ''}
        `;
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
            <ul>
                ${atributos.split('\n').map(linea => {
                    const [clave, valor] = linea.split(':').map(part => part.trim());
                    if (!clave || !valor) return '';
                    return `<li><strong>${clave}:</strong> ${valor}</li>`;
                }).join('')}
            </ul>
            ${bioFormateada || '<p>Desconocida</p>'}
            <hr>
            `;
            voz.innerHTML = 
            `
                ${Personaje.voices?.length > 0 ? `
                <h4>Actores de voz:</h4>
                <ul>
                    ${Personaje.voices.map(v => `
                        <li>
                            <img src="${v.person.images.jpg.image_url}" alt="${v.person.name}">
                            
                                <strong>${v.person.name}</strong><br>
                                <p>${v.language}</p>
                            
                        </li>
                    `).join('')}
                </ul>
                <hr>
            ` : ''}
        `;

            imagenPersonaje.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del Personaje:', error));
}
if (!parametros.has("id")) {
       
    window.location.href = window.location.pathname + "?id=1";
  }