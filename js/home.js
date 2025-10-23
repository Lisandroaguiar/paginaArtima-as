// Renderizar layout sin botón de volver
Layout.render(false);

// Event listeners para las categorías
document.querySelectorAll('.category-circle').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        window.location.href = `obras.html?category=${category}`;
    });
});