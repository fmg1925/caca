
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const catalogo = document.querySelector('.Catalogo');
    let currentPage = 1;
    
    switch(categoria)
    {
        case 'populares':
            fetch(`https://api.jikan.moe/v4/top/manga?page=${page}&limit=25`)   
        break;
    }

