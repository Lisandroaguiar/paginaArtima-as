const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const progressRange = document.getElementById('progressRange');

let isDown = false;
let startX;
let scrollLeft;
let scrollMax;

// --- Calcular el desplazamiento máximo ---
function updateScrollMax() {
  const visibleWidth = document.querySelector('.carousel-container').offsetWidth;
  const totalWidth = carousel.scrollWidth;
  scrollMax = totalWidth - visibleWidth;
}
updateScrollMax();
window.addEventListener('resize', updateScrollMax);

// --- Función genérica para arrastre ---
function startDrag(x) {
  isDown = true;
  carousel.classList.add('grabbing');
  startX = x - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
}

function moveDrag(x) {
  if (!isDown) return;
  const walk = (x - startX);
  carousel.scrollLeft = scrollLeft - walk;
  const percent = (carousel.scrollLeft / scrollMax) * 100;
  progressRange.value = percent;
}

function endDrag() {
  isDown = false;
  carousel.classList.remove('grabbing');
}

// --- Mouse ---
carousel.addEventListener('mousedown', (e) => startDrag(e.pageX));
carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  moveDrag(e.pageX);
});
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);

// --- Touch (mobile) ---
carousel.addEventListener('touchstart', (e) => {
  startDrag(e.touches[0].pageX);
});
carousel.addEventListener('touchmove', (e) => {
  moveDrag(e.touches[0].pageX);
});
carousel.addEventListener('touchend', endDrag);

// --- Sincronizar el scroll con el slider ---
progressRange.addEventListener('input', (e) => {
  const percent = e.target.value / 100;
  carousel.scrollLeft = scrollMax * percent;
});

// --- Botones izquierda/derecha ---
nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 220 + 32, behavior: 'smooth' });
  setTimeout(() => {
    const percent = (carousel.scrollLeft / scrollMax) * 100;
    progressRange.value = percent;
  }, 300);
});

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -(220 + 32), behavior: 'smooth' });
  setTimeout(() => {
    const percent = (carousel.scrollLeft / scrollMax) * 100;
    progressRange.value = percent;
  }, 300);
});
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
