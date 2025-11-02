
document.addEventListener('DOMContentLoaded', () => {

    // --- REPLACE: Old Mobile Navigation with this ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('#sidebar .nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Close sidebar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        });
    });
    // --- End of new sidebar logic ---
    
    // Fade-in animation on scroll
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Active navigation link highlighting on scroll (No changes needed)
    const highlightLinks = document.querySelectorAll('#sidebar .nav-link'); // Use new selector
    const contentSections = document.querySelectorAll('main section');

    const highlightNavLink = () => {
        let currentSectionId = '';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        highlightLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

});
