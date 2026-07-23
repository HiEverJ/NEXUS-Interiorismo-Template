==========================================================================
NEXUS — MONOLITHIC INTERIOR ARCHITECTURE & DESIGN WEB TEMPLATE
==========================================================================
Thank you for purchasing NEXUS. This premium single-page HTML5 template 
is engineered for elite interior architects, design studios, and luxury
real estate developments.

--------------------------------------------------------------------------
1. PROJECT STRUCTURE
--------------------------------------------------------------------------
- index.html        : Core semantic HTML5 structure with SEO metadata.
- scss/             : Modular SCSS source files for advanced styling.
- assets/js/main.js : Core interactive engine (Theme Switcher, Scroll Spy).

--------------------------------------------------------------------------
2. HOW TO CUSTOMIZE CONTENT
--------------------------------------------------------------------------
All content blocks are semantic, clean, and thoroughly commented within 'index.html'.

A. Changing Text Content:
Open 'index.html' in your text editor and locate the targeted component wrappers:
- Main Threshold (Hero) : Look for '.section-hero' and '.hero-main-title'
- Material Curation     : Look for '.section-curator' and '.hotspot-card'
- Selected Works        : Look for '.section-cinematic' and '.cinematic-meta'
- Studio Offerings      : Look for '.section-services' and '.service-body'

B. Updating Material Hotspots:
The interactive material canvas features pulsing nodes. To update the hotpots:
1. Locate '.material-hotspot' elements inside the '.interactive-canvas' block.
2. Adjust the inline 'style' attributes for positioning ('top' and 'left' values).
3. Edit the <h4> title and <p> description within each '.hotspot-card'.

C. Replacing Portfolio Imagery:
Imagery relies on hardware-accelerated 'object-fit' CSS attributes.
1. Place your target images inside your assets directory.
2. Update the 'src' attribute within '.hero-img', '.canvas-base-img', and '.cinematic-item' containers.
   Example: <img src="assets/img/your-project.jpg" alt="Signature Space">

--------------------------------------------------------------------------
3. CHROMATIC ENVIRONMENT SWITCH (DARK / LIGHT MODES)
--------------------------------------------------------------------------
Theme states are managed dynamically via CSS variables for 60fps performance.
To adjust the core color palettes or typography tokens, update the variables
in 'scss/_variable.scss' or your main compiled stylesheet:

- ':root'               : Defines the default Dark Mode palette (Deep Charcoal).
- '[data-theme="light"]': Defines the default Light Mode palette (Warm Stucco).

--------------------------------------------------------------------------
4. SUPPORT & LICENSE
--------------------------------------------------------------------------
For technical inquiries, bug reports, or customization guidance, please reach
out directly through your marketplace account portal.
==========================================================================