document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const startBtn = document.getElementById('start-btn');
    const sidebar = document.getElementById('sidebar');
    const desktop = document.getElementById('desktop');

    if (startBtn && sidebar) {
        startBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                startBtn.classList.add('active'); // Visual feedback
            } else {
                startBtn.classList.remove('active');
            }
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768) { // Only on mobile
                if (!sidebar.contains(e.target) && !startBtn.contains(e.target) && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    startBtn.classList.remove('active');
                }
            }
        });
    }

    // --- Window Logic (Minimize, Maximize, Close) ---
    // Selector targets only controls within .window, strictly avoiding the GIF containers
    const windowControls = document.querySelectorAll('.window .title-bar-controls');

    windowControls.forEach(controls => {
        const win = controls.closest('.window');
        const buttons = controls.querySelectorAll('.title-btn');

            /* 
               Window controls are now purely decorative per user request.
               Functionality removed.
            */
            const minimizeBtn = buttons[0]; 
            const maximizeBtn = buttons[1]; 
            const closeBtn = buttons[2];

    }); // Closing forEach loop

    // --- Drag to Scroll Logic (Desktop) ---
    const sliders = document.querySelectorAll('.portfolio-grid, .blog-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active'); // You might want to style cursor: grabbing here
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'default';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'default';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // --- Dynamic Project Rendering (Refactor) ---
    const projectGrid = document.querySelector('.portfolio-grid');
    if (projectGrid) {
        const projects = [
            {
                title: 'TiendaFiksi.com',
                category: 'Dropshipping & E-commerce',
                description: 'Tienda Dropshipping en Shopify. Integración de proveedores y optimización para conversión.',
                image: 'img/ditherTiendaPixel.svg',
                link: 'https://tiendafiksi.com',
                alt: 'Tienda Fiksi'
            },
            {
                title: 'IOrganizeUSA.online',
                category: 'Servicios de Limpieza',
                description: 'Sitio web corporativo para servicios profesionales de organización. Diseño limpio, gestión de citas y presencia digital local.',
                image: 'img/ditherIOrganizePixel.svg',
                link: 'https://iorganizeusa.online',
                alt: 'IOrganize'
            },
            {
                title: 'NailsSpaByLeidy.com',
                category: 'Servicios de Belleza',
                description: 'Plataforma digital para salón de belleza. Catálogo de servicios, galería y citas online.',
                image: 'img/ditherNailPixel.svg',
                link: 'https://nailspabyleidy.com',
                alt: 'Nails Spa'
            }
        ];

        function renderProjects() {
            // Clear existing content (if any, though we will remove it from HTML)
            projectGrid.innerHTML = '';

            projects.forEach(project => {
                // Create Window Container
                const windowDiv = document.createElement('div');
                windowDiv.className = 'window content-window';

                // Create Title Bar
                const titleBar = document.createElement('div');
                titleBar.className = 'title-bar';
                
                const titleText = document.createElement('div');
                titleText.className = 'title-bar-text';
                titleText.textContent = project.title;

                const controls = document.createElement('div');
                controls.className = 'title-bar-controls';
                ['t', 'p', 'x'].forEach(type => { // placeholders for _ □ ×
                   const btn = document.createElement('button');
                   btn.className = 'title-btn';
                   if (type === 't') btn.textContent = '_';
                   if (type === 'p') btn.textContent = '□';
                   if (type === 'x') btn.textContent = '×';
                   controls.appendChild(btn);
                });

                titleBar.appendChild(titleText);
                titleBar.appendChild(controls);

                // Create Window Body
                const windowBody = document.createElement('div');
                windowBody.className = 'window-body';

                // Media Container
                const mediaContainer = document.createElement('div');
                mediaContainer.className = 'media-container';
                
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.alt;
                img.className = 'project-window-logo';
                img.style.margin = '0 auto';
                img.style.display = 'block';
                mediaContainer.appendChild(img);

                // H3 Title
                const h3 = document.createElement('h3');
                h3.style.marginTop = '0';
                h3.style.fontFamily = 'var(--font-pixel)';
                h3.style.fontSize = '14px';
                h3.textContent = project.category;

                // Paragraph
                const p = document.createElement('p');
                p.textContent = project.description;

                // Button Container
                const btnContainer = document.createElement('div');
                btnContainer.className = 'archive-btn-container';

                const a = document.createElement('a');
                a.href = project.link;
                a.target = '_blank';
                a.className = 'win95-btn';
                a.textContent = 'VISITAR SITIO';
                
                btnContainer.appendChild(a);

                // Assemble Body
                windowBody.appendChild(mediaContainer);
                windowBody.appendChild(h3);
                windowBody.appendChild(p);
                windowBody.appendChild(btnContainer);

                // Assemble Window
                windowDiv.appendChild(titleBar);
                windowDiv.appendChild(windowBody);

                // Append to Grid
                projectGrid.appendChild(windowDiv);
            });
        }

        renderProjects();
    }

}); // Closing DOMContentLoaded
