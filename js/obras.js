// Renderizar layout CON botón de volver
Layout.render(true);

// Obtener categoría de la URL
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category');

// Configurar título y colores
const categoryNames = {
    memoria: 'Memoria',
    percepcion: 'Percepción',
    cuerpo: 'Cuerpo',
    conciencia: 'Conciencia'
};

document.getElementById('category-title').textContent = categoryNames[currentCategory];
document.body.classList.add(currentCategory);

// Variables del carrusel
let worksData = [];
let filteredWorks = [];
let currentIndex = 0;

// Cargar datos del JSON
fetch('data/works.json')
    .then(response => response.json())
    .then(data => {
        worksData = data.works;
        // Filtrar obras por categoría
        filteredWorks = worksData.filter(work => 
            work.categories.includes(currentCategory)
        );
        renderCarousel();
    })
    .catch(error => console.error('Error cargando datos:', error));

function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = filteredWorks.map((work, index) => `
        <div class="carousel-item ${index === currentIndex ? 'active' : ''}" 
             onclick="goToWork(${work.id})">
            <div class="work-image">
                <img src="${work.image}" alt="${work.title}">
                <div class="work-overlay">
                    <p class="work-author">${work.author}</p>
                </div>
            </div>
        </div>
    `).join('');
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === currentIndex - 1 || 
                  (currentIndex === 0 && index === items.length - 1)) {
            item.classList.add('prev');
        } else if (index === currentIndex + 1 || 
                  (currentIndex === items.length - 1 && index === 0)) {
            item.classList.add('next');
        }
    });

    // Mover indicador de color
    if (filteredWorks.length > 1) {
        const percentage = (currentIndex / (filteredWorks.length - 1)) * 100;
        document.getElementById('colorIndicator').style.left = `${percentage}%`;
    }
}

document.getElementById('prevBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + filteredWorks.length) % filteredWorks.length;
    updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % filteredWorks.length;
    updateCarousel();
});

function goToWork(id) {
    window.location.href = `obra.html?id=${id}`;
}