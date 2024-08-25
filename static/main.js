// JavaScript file

// Change contact form button text after submit
const urlParams = new URLSearchParams(window.location.search);
const formStatus = urlParams.get('status');

// Get the submit button and the form by ID
let submitBtn = document.getElementById("submitBtn");
let form = document.getElementById("contactForm");

if (submitBtn && form) {
    submitBtn.addEventListener('click', (event) => {
        if (form.checkValidity()) {
            event.preventDefault(); 
            submitBtn.innerText = "Submitting...";

            // Wait a bit and then submit
            setTimeout(() => {
                form.submit(); 
            }, 100); 
        }
    });

    if (formStatus === 'submitted') {
        submitBtn.innerText = "Submitted!";
        submitBtn.disabled = true;
    }
}

// Dynamic search bar
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input'); 
    const suggestions = document.getElementById('suggestions');

    // Define the keyword_map data in JavaScript
    const keywordMap = [
        {"keyword": "About", "route": "/about"},
        {"keyword": "Contact", "route": "/contact"},
        {"keyword": "Projects", "route": "/projects"},
        {"keyword": "CSS", "route": "/projects"}, 
        {"keyword": "Education", "route": "/about#education"}, 
        {"keyword": "Email", "route": "/contact"}, 
        {"keyword": "Gold Coast Surf Forecast", "route": "/projects#gcsf"}, 
        {"keyword": "HTML", "route": "/projects"}, 
        {"keyword": "JavaScript", "route": "/projects"}, 
        {"keyword": "Personal website", "route": "/projects#personal"}, 
        {"keyword": "Phone", "route": "/contact"}, 
        {"keyword": "Python", "route": "/projects"}, 
        {"keyword": "SQL", "route": "/projects"}, 
        {"keyword": "Stocks", "route": "/projects#stocks"}, 
        {"keyword": "Web application", "route": "/projects"}, 
        {"keyword": "Website", "route": "/projects#personal"}, 
    ];

    // Show suggestions when typing in the search input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        suggestions.innerHTML = ''; // Clear previous suggestions

        if (query) {
            keywordMap.forEach(item => {
                if (item.keyword.toLowerCase().includes(query)) {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');

                    // Create icon
                    const icon = document.createElement('i');
                    icon.classList.add('bi', 'bi-search', 'me-2');
                    icon.style.fontSize = '0.6rem';

                    // Append icon and keyword to suggestion item
                    suggestionItem.appendChild(icon);
                    suggestionItem.appendChild(document.createTextNode(item.keyword));

                    // Add click event to navigate to the route
                    suggestionItem.addEventListener('click', function() {
                        window.location.href = item.route;
                    });

                    suggestions.appendChild(suggestionItem);
                }
            });
        }
    });

    // Hide suggestions when clicking outside the search bar
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
            suggestions.innerHTML = ''; // Clear suggestions
        }
    });
});
