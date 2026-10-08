NEXUS — Interior Architecture HTML Template
Version 1.1.0 | 8 October 2026

START HERE
Open documentation/index.html for setup, customization, deployment and troubleshooting.
Open index.html to preview the website. No framework or build step is required.

FILES
index.html                 Single-page website: home, materials, projects, services, contact.
scss/main.css              Existing compiled visual styles.
scss/enhancements.css      Current accessibility and responsive styles; loaded AFTER main.css.
scss/main.scss             Optional original Sass entry point.
assets/js/theme.js         Early theme initialization (load before styles).
assets/js/main.js          Menu, theme, materials and gallery behavior.
documentation/index.html   Current buyer documentation.
release/SELLER-NOTES.txt   Seller preparation and remaining release checks (not buyer content).
scripts/package.py         Build a clean buyer ZIP with local image placeholders.

REQUIREMENTS AND SCOPE
An HTML/CSS editor and basic HTML knowledge. Static hosting. No Node.js required to use.
This is not a WordPress, Shopify, Webflow or drag-and-drop theme.
Contact opens an email application; there is no form backend, CMS or newsletter service.
Replace studio@example.com in BOTH visible text and mailto link before publishing.
Names, project details and material descriptions are fictional demonstration content.

IMAGES AND FONTS
The working demo loads five remote Unsplash photos and Google Fonts (Prata and DM Sans).
These services require internet access. No photo or font binaries are included.
The buyer ZIP uses local SVG image placeholders instead of remote stock photographs.
Replace the placeholders with your own images and adjust srcset/sizes if using variants.
Remote font references remain optional; system serif/sans-serif fallbacks are available.
The template does not grant rights to third-party photographs or fonts.

EDITING STYLES
For everyday changes, edit scss/enhancements.css; it is plain CSS, despite the folder name.
For original design variables, edit scss/_variable.scss and compile scss/main.scss with Sass.
Example with an installed Dart Sass CLI: sass scss/main.scss scss/main.css
Keep enhancements.css after main.css. Its palette overrides take precedence.
No Sass/compiler installation is included or required to use the compiled website.

SUPPORT AND LICENSE
Use the support contact and purchase license supplied by the seller/store listing.
No extra license grants are implied by this README. Seller must supply support details.
The earlier NEXUS_Documentation.pdf predates version 1.1.0; use the HTML guide instead.
It is intentionally excluded from the buyer ZIP to avoid conflicting instructions.
