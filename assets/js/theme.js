// Apply the palette before CSS paints. Storage is optional.
try {
    const saved = localStorage.getItem('nexus-theme');
    document.documentElement.dataset.theme = ['light', 'dark'].includes(saved)
        ? saved : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
} catch {
    document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
