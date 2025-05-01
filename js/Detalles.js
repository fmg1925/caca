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
            let sinopsisFormateada = 'Desconocida';

            if (manga.synopsis) {
                const sinopsisLimpia = manga.synopsis.replace(/\[Written by MAL Rewrite\]/, '');
                sinopsisFormateada = sinopsisLimpia
                    .split('\n\n')
                    .map(parrafo => `<p>${parrafo.trim()}</p>`)
                    .join('');
            }

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
            ${manga.demographics?.length > 0 ? `<p><strong>Categoria:</strong> ${manga.demographics.map(categ => categ.name).join(', ')}</p>` : ''}
            ${manga.genres?.length > 0 ?`<p><strong>Genero/s:</strong>  ${manga.genres.map(gen => gen.name).join(', ')}</p>` : ''}
            ${manga.themes?.length > 0 ?`<p><strong>Tema/s:</strong>  ${manga.themes.map(tem => tem.name).join(', ')}</p>` : ''}
            ${manga.authors?.length > 0 ?`<p><strong>Autor:</strong>  ${manga.authors.map(autor => autor.name).join(', ')}</p>`: ''}
            <p><strong>Capítulos:</strong> ${manga.chapters || 'N/A'}</p>
            <p><strong>Volumenes:</strong> ${manga.volumes || 'N/A'}</p>
            <p><strong>Estado:</strong> ${manga.status || 'N/A'}</p>
            <p><strong>Editorial:</strong> ${(manga.serializations?.length > 0 ? manga.serializations.map(peo => peo.name).join(', ') : 'N/A')}</p>
            <p><strong>Fecha de publicación:</strong> ${fechaInicio} - ${fechaFin}</p>
            <hr>
            `;
            estadisticas.innerHTML = `
            ${manga.score ? `<p><strong>Puntuación:</strong> ${manga.score} (reseñado por <strong>${manga.scored_by}</strong> usuarios)</p>` : ''}
            ${manga.rank ? `<p><strong>Ranking:</strong> #${manga.rank}</p>` : ''}
            ${manga.popularity ? `<p><strong>Ranking usuarios:</strong> #${manga.popularity}</p>` : ''}
            ${manga.favorites ? `<p><strong>Favorito de:</strong> ${manga.favorites}</p>` : ''}
            ${(manga.score || manga.rank || manga.popularity || manga.favorites) ? '<hr>' : ''}
            `;
            ranking.innerHTML =
            `
            ${manga.score ? `<p><strong>Puntuación:</strong> ${manga.score} (reseñado por <strong>${manga.scored_by}</strong> usuarios)</p>` : ''}
            ${manga.rank ? `<p><strong>Ranking:</strong> #${manga.rank}</p>` : ''}
            ${manga.popularity ? `<p><strong>Ranking usuarios:</strong> #${manga.popularity}</p>` : ''}
            ${manga.favorites ? `<p><strong>Favorito de:</strong> ${manga.favorites}</p>` : ''}
            ${(manga.score || manga.rank || manga.popularity || manga.favorites) ? '<hr>' : ''}
            `;
            sinopsis.innerHTML =
            `
            <strong>Sinopsis</strong> 
            <p>${sinopsisFormateada || 'Desconocida'}</p>
            <hr>
            `;
            relacionados.innerHTML =
            relaciones?.length > 0 ? 
            `
                <strong>Relacionado</strong> 
                <p>
                    ${relaciones
                        .map(rel => `${rel.relation}: ${rel.entry.map(e => e.name).join(', ')}`)
                        .join('<br>')}
                </p>
                <hr>
            ` : ''
            ;

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
                <hr>
                `;
                personajes.appendChild(divPersonaje);
              });
            });
            fetch(`https://api.jikan.moe/v4/manga/${manga.mal_id}/reviews`)
            .then(res => res.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const reseñas = data.data.slice(0, 3); // Limita a 3 reseñas
                    foro.innerHTML = `
                        <strong>Reseñas</strong>
                        <ul>
                            ${reseñas.map(review => {
                                let reseñaFormateada = review.review
                                    .split('\n')
                                    .map(parrafo => `<p>${parrafo.trim()}</p>`)
                                    .join('');
                                return `
                                    <li>
                                        <p><strong>Por:</strong> ${review.user.username} | <em>${review.tags.join(', ')}</em></p>
                                        ${reseñaFormateada}
                                        <hr>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    `;
                } else {
                    foro.innerHTML = `
                        <strong>Reseñas</strong>
                        <p>No hay reseñas disponibles.</p>
                        <hr>
                    `;
                }
            })
            .catch(error => {
                foro.innerHTML = `
                    <strong>Reseñas</strong>
                    <p>Error al cargar las reseñas.</p>
                    <hr>
                `;
                console.error('Error al obtener las reseñas del manga:', error);
            });
        
            imagenManga.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del manga:', error));
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