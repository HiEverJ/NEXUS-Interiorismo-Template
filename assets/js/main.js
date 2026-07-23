document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();
    initScrollSpyEngine();
    initCollapsibleSidebar();
    initCinematicSlider();
});

function initThemeEngine() {
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    if (!themeToggle) return;
    const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
    rootElement.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('nexus-theme', newTheme);
    });
}

function initScrollSpyEngine() {
    const sections = document.querySelectorAll('section[id]');
    const navEntries = document.querySelectorAll('.control-monolith .nav-entry');
    if (sections.length === 0 || navEntries.length === 0) return;
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + (window.innerHeight / 3);
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navEntries.forEach(entry => {
            entry.classList.remove('active');
            if (entry.querySelector('a').getAttribute('href') === `#${currentSectionId}`) {
                entry.classList.add('active');
            }
        });
    }, { passive: true });
}

function initCollapsibleSidebar() {
    const sidebar = document.querySelector('.control-monolith');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150 && window.scrollY > lastScrollY) {
            sidebar.classList.add('collapsed');
        } else if (window.scrollY < lastScrollY) {
            sidebar.classList.remove('collapsed');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });
}

function initCinematicSlider() {
    const track = document.getElementById('portfolio-track');
    const btnNext = document.getElementById('track-next');
    const btnPrev = document.getElementById('track-prev');

    if (!track || !btnNext || !btnPrev) return;

    const scrollAmount = 400; // Distancia de desplazamiento por clic en píxeles

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}