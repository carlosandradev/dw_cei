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

}); // Closing DOMContentLoaded
