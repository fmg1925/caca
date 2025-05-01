//trata de hacer un enlace de las demographics y categoria al catalogo porque seria god uwu
const parametros = new URLSearchParams(window.location.search);
const idManga = parametros.get('id');

//coso del html
const imagenManga= document.querySelector('.imagenManga');
const detallesManga = document.querySelector('.detallesManga');
const estadisticas = document.querySelector('.estadisticas');
if (idManga) {
    fetch(`https://api.jikan.moe/v4/manga/${idManga}/full`)
        .then(response => response.json())
        .then(data => {
            const manga = data.data;
            const relaciones = manga.relations || [];
            const img = document.createElement('img');
            const ranking = document.getElementById('ranking');
            const sinopsis = document.getElementById('sinopsis');
            const relacionados = document.getElementById('relacionados');
            const personajes = document.getElementById('personajes');
            const foro = document.getElementById('foro');
            const fechaInicio = new Date(manga.published?.from).toLocaleDateString();
            const fechaFin = manga.published?.to ? new Date(manga.published.to).toLocaleDateString() : 'hasta hoy';
            let sinopsisLimpia = manga.synopsis.replace(/\[Written by MAL Rewrite\]/, '');
            let sinopsisFormateada = sinopsisLimpia
            .split('\n\n') // separamos por saltos dobles de línea
            .map(parrafo => `<p>${parrafo.trim()}</p>`)
            .join('');

            img.src=manga.images.jpg.image_url;
            img.alt=manga.title;
            
            detallesManga.innerHTML=
            `
            <h4>${manga.title}</h4>
            <hr>
            <h4>Títulos alternativos:</h4>
            <ul>
            <li><p>${manga.title_english || ''}</p></li>
            <li><p>${manga.title_japanese || ''}</p></li>
            </ul>
            <hr>
            <h4>Información</h4>
            <p><strong>Tipo:</strong> ${manga.type}</p>
            <p><strong>Categoria:</strong> ${(manga.demographics?.length > 0 ? manga.demographics.map(categ => categ.name).join(', ') : 'Desconocida')}</p>
            <p><strong>Genero/s:</strong> ${(manga.genres?.length > 0 ? manga.genres.map(gen => gen.name).join(', ') : 'Desconocida')}</p>
            <p><strong>Tema/s:</strong> ${(manga.themes?.length > 0 ? manga.themes.map(tem => tem.name).join(', ') : 'Desconocida')}</p>
            <p><strong>Autor:</strong> ${(manga.authors?.length > 0 ? manga.authors.map(autor => autor.name).join(', ') : 'Desconocido')}</p>
            <p><strong>Capítulos:</strong> ${manga.chapters || 'Desconocida'}</p>
            <p><strong>Volumenes:</strong> ${manga.volumes || 'Desconocida'}</p>
            <p><strong>Estado:</strong> ${manga.status || 'Desconocida'}</p>
            <p><strong>Editorial:</strong> ${(manga.serializations?.length > 0 ? manga.serializations.map(peo => peo.name).join(', ') : 'Desconocido')}</p>
            <p><strong>Fecha de publicación:</strong> ${fechaInicio} - ${fechaFin}</p>
            <hr>
            `;
            estadisticas.innerHTML =
            `
            <p><strong>Puntuacion:</strong> ${manga.score || 'Desconocida'} (reseñado por <strong>${manga.scored_by || 'Desconocida'}</strong> usuarios)</p>
            <p><strong>Ranking:</strong> #${manga.rank || 'Desconocida'}</p>
            <p><strong>Rankig usuarios:</strong> #${manga.popularity || 'Desconocida'}</p>
            <p><strong>Favorito de:</strong> ${manga.favorites || 'Desconocida'}</p>
            
            `;
            ranking.innerHTML =
            `
            <strong>Puntuacion</strong> 
            <p>${manga.score || 'Desconocida'} (reseñado por <strong>${manga.scored_by || 'Desconocida'}</strong> usuarios)</p>
            <p><strong>Ranking:</strong> #${manga.rank || 'Desconocida'}</p>
            <p><strong>Rankig Popular:</strong> #${manga.popularity || 'Desconocida'}</p>
            <p><strong>Favorito de:</strong> ${manga.favorites || 'Desconocida'}</p>
            <hr>
            `;
            sinopsis.innerHTML =
            `
            <strong>Sinopsis</strong> 
            <p>${sinopsisFormateada || 'Desconocida'}</p>
            <hr>
            `;
            relacionados.innerHTML =
            `
            <strong>Relacionado</strong> 
            <p>
                ${relaciones?.length > 0 ? relaciones
                        .map(rel => `${rel.relation}: ${rel.entry.map(e => e.name).join(', ')}`)
                        .join('<br>')
                    : 'Desconocida'
                }
            </p>

            <hr>
            `;
            fetch(`https://api.jikan.moe/v4/manga/${manga.mal_id}/characters`)
            .then(res => res.json())
            .then(data => {
              data.data.forEach(personaje => {
                const divPersonaje = document.createElement('div');
                divPersonaje.innerHTML = 
                `
                <a href="Personajes.html?id=${personaje.character.mal_id}">
                    <img src="${personaje.character.images.jpg.image_url}" alt="${personaje.character.name}" />
                    <p>${personaje.character.name}</p>
                    <p>Rol: ${personaje.role}</p>
                </a>
                `;
                personajes.appendChild(divPersonaje);
              });
            });
            foro.innerHTML =
            `
            <hr>
            <strong>Puntuacion</strong> 
            <p>${manga.score || 'Desconocida'} (reseñado por <strong>${manga.scored_by || 'Desconocida'}</strong> usuarios)</p>
            <p><strong>Ranking:</strong> ${manga.rank || 'Desconocida'}</p>
            <p><strong>Rankig Popular:</strong> ${manga.popularity || 'Desconocida'}</p>
            <p><strong>Favorito de:</strong> ${manga.favorites || 'Desconocida'}</p>
            <hr>
            `;

            imagenManga.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del manga:', error));
}