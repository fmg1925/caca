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
            const img = document.createElement('img');
            const ranking = document.getElementById('ranking');
            const sinopsis = document.getElementById('sinopsis');
            const relacionados = document.getElementById('relacionados');
            const personajes = document.getElementById('personajes');
            const foro = document.getElementById('foro');
            
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
            
            <p><strong>tipo:</strong> ${manga.type}</p>
            <p><strong>Categoria:</strong> ${(manga.demographics?.length > 0 ? manga.demographics.map(c => c.name).join(', ') : 'Desconocida')}</p>
<p><strong>Autor:</strong> ${(manga.authors?.length > 0 ? manga.authors.map(a => a.name).join(', ') : 'Desconocido')}</p>
            <p><strong>Capítulos:</strong> ${manga.chapters || 'Desconocida'}</p>
            <p><strong>volumenes:</strong> ${manga.volumes || 'Desconocida'}</p>
            <p><strong>Estado:</strong> ${manga.status || 'Desconocida'}</p>
            <p><strong>Fecha de estreno:</strong> ${manga.published.string || 'Desconocida'}</p>
            
            <hr>
            `;
            estadisticas.innerHTML =
            `
            <p><strong>Puntuacion:</strong> ${manga.score || 'Desconocida'} (reseñado por: ${manga.scored_by || 'Desconocida'})</p>
            <p><strong>Ranking:</strong> #${manga.rank || 'Desconocida'}</p>
            <p><strong>Rankig usuarios:</strong> ${manga.popularity || 'Desconocida'}</p>
            <p><strong>Favorito de:</strong> ${manga.favorites || 'Desconocida'}</p>
            `;

            imagenManga.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del manga:', error));
}