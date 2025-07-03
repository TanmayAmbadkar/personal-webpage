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
    loadContent('./research.html', 'research-placeholder');
    loadContent('./education.html', 'education-placeholder');
    loadContent('./work_experience.html', 'work-experience-placeholder');
    loadContent('./publications.html', 'publications-placeholder');
    loadContent('./projects.html', 'projects-placeholder');
});