// Renderizar layout CON botón de volver
Layout.render(true);

// Obtener ID de la obra
const urlParams = new URLSearchParams(window.location.search);
const workId = parseInt(urlParams.get('id'));

// Variables de la galería
let currentImageIndex = 0;
let images = [];

// Cargar datos del JSON
fetch('data/works.json')
    .then(response => response.json())
    .then(data => {
        const work = data.works.find(w => w.id === workId);
        
        if (work) {
            loadWork(work);
        }
    })
    .catch(error => console.error('Error cargando datos:', error));

function loadWork(work) {
    // Aplicar clase de categoría para colores
    document.body.classList.add(work.categories[0]);

    // Cargar información
    document.getElementById('workTitle').textContent = work.title;
    document.getElementById('workAuthor').textContent = work.author;
    document.getElementById('workDescription').textContent = work.description;
    document.getElementById('themeBtn').textContent = work.theme || 'Tema de investigación';
    
    // Configurar descarga
    document.getElementById('downloadBtn').addEventListener('click', () => {
        window.open(work.pdfUrl, '_blank');
    });

    // Configurar galería
    images = Array.isArray(work.image) ? work.image : [work.image];
    updateGallery();

    // Ocultar navegación si solo hay una imagen
    if (images.length === 1) {
        document.querySelectorAll('.gallery-nav').forEach(btn => {
            btn.style.display = 'none';
        });
    }

    // Event listeners de la galería
    document.getElementById('galleryPrev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    document.getElementById('galleryNext').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });
}

function updateGallery() {
    const galleryDiv = document.getElementById('galleryImage');
    galleryDiv.innerHTML = `<img src="${images[currentImageIndex]}" alt="Imagen de la obra">`;
}