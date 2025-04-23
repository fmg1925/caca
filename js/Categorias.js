
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const catalogo = document.querySelector('.Catalogo');
    const verMas = document.getElementById('verMas');
    let currentPage = 1;
    
    async function cargarmangas()
    {
        catalogo.innerHTML='';
        switch(categoria)
        {
            case 'populares':
                

            await fetch(`https://api.jikan.moe/v4/top/manga?page=${currentPage}&limit=25`)
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
                await fetch(`https://api.jikan.moe/v4/manga?status=${categoria}&limit=25&page=${currentPage}`)
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
                await fetch(`https://api.jikan.moe/v4/manga?genres=${categoria}&limit=25&page=${currentPage}`)
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
    function functionVerMas()
     {
        currentPage++;
        
        buscarMangas(false);
        
      }

    verMas.addEventListener('click', functionVerMas);

    async function buscarMangas(resetPage=true)
    {
        if(resetPage)currentPage=1;
        catalogo.innerHTML = "";
        const busqueda = document.getElementById("buscar").value.trim().toLowerCase();
        if(busqueda == "") return cargarmangas();
        if (busqueda.includes("skibidi")) 
        {
            const Popular = document.createElement('div')
            Popular.classList.add('Popular')
            Popular.innerHTML = `
                <a href="https://www.youtube.com/watch?v=uO1NPnoU2kQ" target="_blank">
                <img src="https://i.pinimg.com/1200x/23/62/2e/23622e721a31b1bf7d58661f91856d7b.jpg">
                <p>Que se mejore</p>
                <p>Antonio porfa matese</p>
                </a>
            `;
            catalogo.appendChild(Popular);
            
        }
        if (busqueda.includes("homero")) {
            const Popular = document.createElement("div");
            Popular.classList.add("Popular");
            Popular.innerHTML = `
                            <a href="https://www.youtube.com/watch?v=LOeL7WHFuiA" target="_blank">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDBp0Dwp-GL1_Xy197a47ZMIfSIuRYGS2B_A&s" >
                            <p>HOMERO HOMERO HOMERO 🗣️🗣️🗣️</p>
                            <p>CERVEZA 🗣️🗣️</p>
                            </a>
                        `;
            catalogo.appendChild(Popular);
          }
          if (busqueda.includes("de guiken")) {
            const Popular = document.createElement("div");
            Popular.classList.add("Popular");
            Popular.innerHTML = `
                                <a href="https://www.youtube.com/watch?v=ll6sBa3Dafs" target="_blank">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppH9apT6gq-lpLNd7IG0mBMMvE8qCweNlZw&s" />
                                <p>de guiken</p>
                                <p>fin de semana</p>
                                </a>
                            `;
            return catalogo.appendChild(Popular);
          }
        else
        {
            await fetch(`https://api.jikan.moe/v4/manga?q=${busqueda}&sfw=true&limit=25&page=${currentPage}`)
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
                                    <p title="${manga.title}">
                                    ${manga.title.length > 100 ? manga.title.slice(0, 100) + '...' : manga.title}
                                    </p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            
                            });
                            
                        });
                        
        }
        
                       
    }
