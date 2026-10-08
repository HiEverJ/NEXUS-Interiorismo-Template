'use strict';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initMaterials();
    initGallery();
});
function initTheme() {
    const button = document.getElementById('theme-toggle');
    const system = window.matchMedia('(prefers-color-scheme: light)');
    let preference;
    try { preference = localStorage.getItem('nexus-theme'); } catch { /* Storage is optional. */ }
    if (!['light', 'dark'].includes(preference)) preference = null;
    const apply = theme => {
        document.documentElement.dataset.theme = theme;
        button.setAttribute('aria-pressed', String(theme === 'light'));
    };
    apply(preference || (system.matches ? 'light' : 'dark'));
    button.addEventListener('click', () => {
        preference = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        apply(preference);
        try { localStorage.setItem('nexus-theme', preference); } catch { /* Continue without persistence. */ }
    });
    system.addEventListener('change', () => {
        if (!preference) apply(system.matches ? 'light' : 'dark');
    });
    button.hidden = false;
}
function initNavigation() {
    const sidebar = document.querySelector('.control-monolith');
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-navigation');
    const mobile = window.matchMedia('(max-width: 992px)');
    const links = [...nav.querySelectorAll('a')];
    const sections = [...document.querySelectorAll('main section[id]')];
    let open = false;
    const render = () => {
        sidebar.classList.toggle('menu-open', open && mobile.matches);
        toggle.setAttribute('aria-expanded', String(open && mobile.matches));
        toggle.textContent = open && mobile.matches ? 'Close' : 'Menu';
        nav.inert = mobile.matches && !open;
    };
    toggle.addEventListener('click', () => { open = !open; render(); });
    links.forEach(link => link.addEventListener('click', () => {
        open = false;
        render();
        document.querySelector(link.hash)?.focus({ preventScroll: true });
    }));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && open) {
            open = false;
            render();
            toggle.focus();
        }
    });
    document.addEventListener('click', event => {
        if (open && !sidebar.contains(event.target)) { open = false; render(); }
    });
    sidebar.addEventListener('focusout', () => {
        requestAnimationFrame(() => {
            if (open && !sidebar.contains(document.activeElement)) { open = false; render(); }
        });
    });
    mobile.addEventListener('change', () => { open = false; render(); });
    sidebar.classList.add('navigation-ready');
    toggle.hidden = false;
    render();
    let scheduled = false;
    const update = () => {
        scheduled = false;
        const threshold = Math.min(window.innerHeight / 3, 240);
        let current = sections[0];
        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= threshold) current = section;
        });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
        links.forEach(link => {
            const active = link.hash === `#${current.id}`;
            link.parentElement.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    const schedule = () => {
        if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    update();
}
function initMaterials() {
    const materials = [...document.querySelectorAll('.material-hotspot')];
    materials.forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) materials.forEach(other => { if (other !== detail) other.open = false; });
        });
        detail.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                detail.open = false;
                detail.querySelector('summary').focus();
            }
        });
    });
    document.addEventListener('click', event => {
        if (!event.target.closest('.material-hotspot')) materials.forEach(detail => { detail.open = false; });
    });
}
function initGallery() {
    const track = document.getElementById('portfolio-track');
    const prev = document.getElementById('track-prev');
    const next = document.getElementById('track-next');
    const update = () => {
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    };
    const move = direction => {
        const items = track.querySelectorAll('.cinematic-item');
        const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth;
        track.scrollBy({ left: direction * step, behavior: reducedMotion() ? 'instant' : 'smooth' });
    };
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            if (event.key === 'Home' || event.key === 'End') track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant' });
            else move(event.key === 'ArrowLeft' ? -1 : 1);
        }
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    prev.hidden = next.hidden = false;
    update();
}
