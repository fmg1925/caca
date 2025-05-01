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
            
            img.src=Personaje.images.jpg.image_url;
            img.alt=Personaje.name;
            
            detallesPersonaje.innerHTML=
            `
            <h4>${Personaje.name}</h4>
            <h6>(${Personaje.name_kanji})</h6>
            <hr>
            <h4>Apariciones anime</h4>
            <p><strong>Categoria:</strong> ${(Personaje.anime?.length > 0 ? Personaje.anime.map(anime => anime.anime.title).join(', ') : 'Desconocida')}</p>
            //cambiarlo a mostrar la foto
            <hr>
            <h4>Apariciones manga</h4>
            <p><strong>Categoria:</strong> ${(Personaje.manga?.length > 0 ? Personaje.manga.map(anime => anime.manga.title).join(', ') : 'Desconocida')}</p>
            //cambiarlo a mostrar la foto
            <hr>
            `;
            estadisticas.innerHTML =
            `
            <p><strong>Favorito de:</strong> ${Personaje.favorites || 'Desconocida'}</p>
            `;

            imagenPersonaje.appendChild(img);
        })
        .catch(error => console.error('Error al obtener los datos del Personaje:', error));
}