fetch("data/obras.json")
  .then(response => response.json())
  .then(data => {
    // Obtener el parámetro de la URL, por ejemplo ?id=juanperez
    const params = new URLSearchParams(window.location.search);
    const obraId = params.get('id');
    const obra = data.find(item => item.id === obraId);

    if (obra) {
      document.getElementById('titulo-obra').textContent = obra.obra;
      document.getElementById('nombre-alumno').textContent = obra.nombre;
      document.getElementById('descripcion-obra').textContent = obra.descripcion;
      document.getElementById('imagen-obra').src = obra.imagenObra || 'placeholder.jpg';
      document.getElementById('descargar-tesina').href = obra.tesina || '#';

      // Cambiar color de fondo según categoría
      const body = document.getElementById('obra-page');
      body.classList.add(`categoria-${obra.categoria}`);
    }
  });
