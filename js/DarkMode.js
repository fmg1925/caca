//DarkMode en la pantalla
          // Función que se activa al hacer clic en el botón para cambiar el modo
          function cambiarModo() {
            const body = document.body; // Se obtiene el elemento <body> del documento
            const modoOscuro = body.classList.toggle("dark-mode"); // Alterna la clase "dark-mode" en el <body>. Devuelve true si se agregó (modo oscuro activado), o false si se quitó.
            localStorage.setItem("modoOscuro", modoOscuro ? "activado" : "desactivado");
            }                           
            // Guarda el estado actual del modo en el almacenamiento local.
            // Si modoOscuro es true, guarda "activado"; si es false, guarda "desactivado".