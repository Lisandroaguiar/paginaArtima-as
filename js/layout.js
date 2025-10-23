const Layout = {
    render(showBackButton = false) {
        const header = document.createElement('header');
        header.className = 'header';
        
        header.innerHTML = `
            ${showBackButton ? '<button class="back-btn" onclick="window.history.back()">←</button>' : ''}
            <div class="logo" onclick="window.location.href='index.html'" style="cursor: pointer;">
                <img src="logo.svg" alt="Logo" onerror="this.style.display='none'; this.parentElement.innerHTML='<h2>Logo</h2>'">
            </div>
            <nav class="header-nav">
                <button class="icon-btn" onclick="window.location.href='index.html'" title="Inicio">📄</button>
                <button class="icon-btn" title="Videos">▶️</button>
                <button class="icon-btn" title="Galería">📷</button>
            </nav>
        `;
        
        document.body.insertBefore(header, document.body.firstChild);
    }
};