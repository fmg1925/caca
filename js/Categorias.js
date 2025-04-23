
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const catalogo = document.querySelector('.Catalogo');
    const verMas = document.getElementById('verMas');
    let currentPage = 1;
    
    function cargarmangas()
    {
        catalogo.innerHTML='';
        switch(categoria)
        {
            case 'populares':
                

                fetch(`https://api.jikan.moe/v4/top/manga?page=${currentPage}&limit=25`)
                    .then(response => response.json())
                    .then(data=> {
                        data.data.forEach(manga=> {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="${manga.url}" target="_blank">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p>${manga.title}</p>
                                </a>
                                `;
                                catalogo.appendChild(Popular);
                        });
                    })
            break;

            case 'Publishing':
            case 'Complete':
                fetch(`https://api.jikan.moe/v4/manga?status=${categoria}&limit=25&page=${currentPage}`)
                    .then(response => response.json())
                    .then(data => 
                        {
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="${manga.url}" target="_blank">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p>${manga.title}</p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            });
                        });
            break;
            
            default:
                fetch(`https://api.jikan.moe/v4/manga?genres=${categoria}&limit=25&page=${currentPage}`)
                    .then(response => response.json())
                    .then(data => 
                        {
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="${manga.url}" target="_blank">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p>${manga.title}</p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            });
                        });
            break;
        }
    }

    cargarmangas();
    function functionVerMas() {
        currentPage++;
        cargarmangas();
      }

    verMas.addEventListener('click', functionVerMas);

    function buscarMangas()
    {
        catalogo.innerHTML = "";
        const busqueda = document.getElementById("buscar").value.trim().toLowerCase();
        fetch(`https://api.jikan.moe/v4/manga?q=${busqueda}&sfw=true`)
                    .then(response => response.json())
                    .then(data => 
                        {
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="${manga.url}" target="_blank">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p>${manga.title}</p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            });
                        });
    }
