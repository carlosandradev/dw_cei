document.addEventListener('DOMContentLoaded', () => {

    // Contador
    let contador = localStorage.getItem('visitas');

    if (!contador) {
        contador = 1;
    } else {
        contador = parseInt(contador) + 1;
    }

    localStorage.setItem('visitas', contador);
    console.log("Visita número: " + contador);

    // Menu Mobil
    const botonInicio = document.getElementById('start-btn');
    const barraLateral = document.getElementById('sidebar');

    if (botonInicio && barraLateral) {
        botonInicio.addEventListener('click', () => {
            barraLateral.classList.toggle('active');
            if (barraLateral.classList.contains('active')) {
                botonInicio.classList.add('active'); 
            } else {
                botonInicio.classList.remove('active');
            }
        });

        // Click fuera para cerrar
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                if (!barraLateral.contains(e.target) && !botonInicio.contains(e.target) && barraLateral.classList.contains('active')) {
                    barraLateral.classList.remove('active');
                    botonInicio.classList.remove('active');
                }
            }
        });
    }

 

    // Scroll con Mouse
    const sliders = document.querySelectorAll('.portfolio-grid, .blog-grid');
    let presionado = false;
    let inicioX;
    let scrollIzq;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            presionado = true;
            slider.classList.add('active');
            slider.style.cursor = 'grabbing';
            inicioX = e.pageX - slider.offsetLeft;
            scrollIzq = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            presionado = false;
            slider.classList.remove('active');
            slider.style.cursor = 'default';
        });

        slider.addEventListener('mouseup', () => {
            presionado = false;
            slider.classList.remove('active');
            slider.style.cursor = 'default';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!presionado) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const desplazamiento = (x - inicioX) * 2; 
            slider.scrollLeft = scrollIzq - desplazamiento;
        });
    });

    // Proyectos
    const rejillaProyectos = document.querySelector('.portfolio-grid');
    if (rejillaProyectos) {
        const misProyectos = [
            {
                titulo: 'TiendaFiksi.com',
                categoria: 'Dropshipping & E-commerce',
                desc: 'Tienda Dropshipping en Shopify. Integración de proveedores y optimización para conversión.',
                img: 'img/ditherTiendaPixel.svg',
                url: 'https://tiendafiksi.com',
                alt: 'Tienda Fiksi'
            },
            {
                titulo: 'IOrganizeUSA.online',
                categoria: 'Servicios de Limpieza',
                desc: 'Sitio web corporativo para servicios profesionales de organización. Diseño limpio, gestión de citas y presencia digital local.',
                img: 'img/ditherIOrganizePixel.svg',
                url: 'https://iorganizeusa.online',
                alt: 'IOrganize'
            },
            {
                titulo: 'NailsSpaByLeidy.com',
                categoria: 'Servicios de Belleza',
                desc: 'Plataforma digital para salón de belleza. Catálogo de servicios, galería y citas online.',
                img: 'img/ditherNailPixel.svg',
                url: 'https://nailspabyleidy.com',
                alt: 'Nails Spa'
            }
        ];

        function mostrarProyectos() {
            rejillaProyectos.innerHTML = '';

            misProyectos.forEach(proyecto => {
                // Ventana
                const ventana = document.createElement('div');
                ventana.className = 'window content-window';

                // Titulo
                const barraTitulo = document.createElement('div');
                barraTitulo.className = 'title-bar';
                
                const textoTitulo = document.createElement('div');
                textoTitulo.className = 'title-bar-text';
                textoTitulo.textContent = proyecto.titulo;

                const controles = document.createElement('div');
                controles.className = 'title-bar-controls';
                ['t', 'p', 'x'].forEach(tipo => { 
                   const btn = document.createElement('button');
                   btn.className = 'title-btn';
                   if (tipo === 't') btn.textContent = '_';
                   if (tipo === 'p') btn.textContent = '□';
                   if (tipo === 'x') btn.textContent = '×';
                   controles.appendChild(btn);
                });

                barraTitulo.appendChild(textoTitulo);
                barraTitulo.appendChild(controles);

                // Contenido
                const cuerpoVentana = document.createElement('div');
                cuerpoVentana.className = 'window-body';

                // Imagen
                const contenedorMedia = document.createElement('div');
                contenedorMedia.className = 'media-container';
                
                const imagen = document.createElement('img');
                imagen.src = proyecto.img;
                imagen.alt = proyecto.alt;
                imagen.className = 'project-window-logo';
                imagen.style.margin = '0 auto';
                imagen.style.display = 'block';
                contenedorMedia.appendChild(imagen);

                // Texto
                const h3 = document.createElement('h3');
                h3.style.marginTop = '0';
                h3.style.fontFamily = 'var(--font-pixel)';
                h3.style.fontSize = '14px';
                h3.textContent = proyecto.categoria;

                const parrafo = document.createElement('p');
                parrafo.textContent = proyecto.desc;

                // Boton
                const contenedorBtn = document.createElement('div');
                contenedorBtn.className = 'archive-btn-container';

                const enlace = document.createElement('a');
                enlace.href = proyecto.url;
                enlace.target = '_blank';
                enlace.className = 'win95-btn';
                enlace.textContent = 'VISITAR SITIO';
                
                contenedorBtn.appendChild(enlace);

                // Agregar todo
                cuerpoVentana.appendChild(contenedorMedia);
                cuerpoVentana.appendChild(h3);
                cuerpoVentana.appendChild(parrafo);
                cuerpoVentana.appendChild(contenedorBtn);

                ventana.appendChild(barraTitulo);
                ventana.appendChild(cuerpoVentana);

                rejillaProyectos.appendChild(ventana);
            });
        }

        mostrarProyectos();
    }

    // Validacion Formulario
    document.addEventListener('submit', (e) => {
        const formulario = e.target;
        
        if (formulario.tagName === 'FORM') {
            const campos = formulario.querySelectorAll('[required]');
            let esValido = true;

            campos.forEach(campo => {
                if (!campo.value.trim()) {
                    esValido = false;
                }
            });

            if (!esValido) {
                e.preventDefault(); 
                alert("Por favor, complete todos los campos requeridos");
            }
        }
    });

});
