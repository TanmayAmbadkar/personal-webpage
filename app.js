document.addEventListener('DOMContentLoaded', function () {
    const mainContentArea = document.getElementById('main-content-area');
    const navLinks = document.querySelectorAll('#main-navbar .nav-link');
    const navbar = document.getElementById('main-navbar');
    
    // --- NEW: Dark Mode Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const sunIconClass = 'bi-sun-fill';
    const moonIconClass = 'bi-moon-stars-fill';

    
    // --- Navbar Hiding Logic (Unchanged) ---
    // let lastScrollTop = 0;
    // window.addEventListener('scroll', function() {
    //     let scrollTop = window.scrollY || document.documentElement.scrollTop;
    //     if (scrollTop > lastScrollTop) {
    //         navbar.classList.add('navbar-hidden');
    //     } else {
    //         navbar.classList.remove('navbar-hidden');
    //     }
    //     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    // }, false);

    // --- NEW: Dark Mode Logic ---
    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Check OS preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            themeIcon.classList.remove(sunIconClass);
            themeIcon.classList.add(moonIconClass);
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            themeIcon.classList.remove(moonIconClass);
            themeIcon.classList.add(sunIconClass);
        }
        localStorage.setItem('theme', theme);
    };

    // Set the theme on initial load
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    // Add click listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });


});


// This function fetches HTML content from a file and injects it into an element
const loadContent = (file, elementId) => {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById(elementId).innerHTML = `<p class="text-danger text-center">Sorry, couldn't load this section.</p>`;
        });
};

// When the DOM is fully loaded, call the function for each section
document.addEventListener('DOMContentLoaded', () => {
    loadContent('./homepage.html', 'homepage');
    loadContent('./research.html', 'research');
    loadContent('./education.html', 'education');
    loadContent('./work_experience.html', 'work-experience');
    loadContent('./publications.html', 'publications');
    // loadContent('./projects.html', 'projects');
});