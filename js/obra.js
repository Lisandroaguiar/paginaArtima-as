fetch("assets/data/obras.json")
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const obraId = params.get('id');
    
    // 1. Encontrar la obra actual
    const index = data.findIndex(item => item.id === obraId);
    
    // Si no encuentra ID o el ID no existe, cargamos el primero por defecto (opcional)
    const currentIndex = index !== -1 ? index : 0;
    const obra = data[currentIndex];

    if (obra) {
      // Rellenar datos
      document.getElementById('titulo-obra').textContent = obra.obra;
      document.getElementById('nombre-alumno').textContent = obra.nombre;
      document.getElementById('descripcion-obra').textContent = obra.descripcion;
      document.getElementById('imagen-obra').src = obra.imagenObra || 'assets/img/placeholder.jpg';
      
      // Configurar botones de descarga/tesina
      const linkTesina = document.getElementById('link-tesina');
      const btnDescarga = document.getElementById('descargar-tesina');
      
      if(obra.tesina) {
          btnDescarga.href = obra.tesina;
      } else {
          // Si no hay tesina, ocultar o deshabilitar
          btnDescarga.style.opacity = "0.5";
          btnDescarga.style.pointerEvents = "none";
      }

      // Cambiar color de fondo según categoría
      const body = document.getElementById('obra-page');
      // Limpiamos clases anteriores por si acaso
      body.className = ''; 
      body.classList.add(`categoria-${obra.categoria}`);

      // 2. Lógica de VIDEO (Con chequeo de seguridad)
      const videoContainer = document.getElementById("video-obra");
      videoContainer.innerHTML = ""; // Limpiar
      
      if (obra.video && obra.video.includes("v=")) {
        const videoId = obra.video.split("v=")[1].split("&")[0]; // split("&") previene errores si hay timestamps
        videoContainer.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>`;
      } else {
          videoContainer.style.display = 'none'; // Ocultar si no hay video
      }

      // 3. Lógica de FLECHAS (Anterior / Siguiente)
      // Usamos módulo (%) para hacer un carrusel infinito
      const prevIndex = (currentIndex - 1 + data.length) % data.length;
      const nextIndex = (currentIndex + 1) % data.length;

      document.getElementById('nav-prev').href = `?id=${data[prevIndex].id}`;
      document.getElementById('nav-next').href = `?id=${data[nextIndex].id}`;
    }
  })
  .catch(err => console.error("Error cargando obras:", err));