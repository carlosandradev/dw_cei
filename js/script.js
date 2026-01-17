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

        if (buttons.length >= 3) {
            const minimizeBtn = buttons[0]; // _
            const maximizeBtn = buttons[1]; // □
            const closeBtn = buttons[2];    // ×

            // Minimize (_)
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling
                const body = win.querySelector('.window-body');
                if (body) {
                    if (body.style.display === 'none') {
                        body.style.display = 'block';
                    } else {
                        body.style.display = 'none';
                    }
                }
            });

            // Maximize (□)
            maximizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                win.classList.toggle('maximized');
            });

            // Close (×)
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Find the parent column if it exists to hide the whole thing if needed, 
                // but usually closing the window just hides the .window element
                win.style.display = 'none';
            });
        }
    });
});
