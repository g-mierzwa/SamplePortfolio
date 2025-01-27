document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu Functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    function toggleMenu() {
        if (navMenu.style.display === "block") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "block";
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project Filtering (assuming you have categories)
    function filterProjects(category) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (category === 'all' || project.classList.contains(category)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Lightbox Effect for Project Images
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightboxImg.id = 'lightbox-image';
    lightbox.appendChild(lightboxImg);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-lightbox';
    closeBtn.innerHTML = '&times;';
    lightbox.appendChild(closeBtn);

    document.querySelectorAll('.project img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg && e.target.id !== 'close-lightbox') {
            this.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });


    // Form Validation
    const contactForm = document.querySelector('#contact form');
    const feedback = document.createElement('p');
    feedback.style.color = 'red';
    contactForm.appendChild(feedback);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate Name
        if (!contactForm.name.value) {
            contactForm.name.classList.add('error');
            feedback.textContent = "Please enter your name.";
            isValid = false;
        } else {
            contactForm.name.classList.remove('error');
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactForm.email.value)) {
            contactForm.email.classList.add('error');
            feedback.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            contactForm.email.classList.remove('error');
        }

        // Validate Message
        if (!contactForm.message.value) {
            contactForm.message.classList.add('error');
            feedback.textContent = "Please enter your message.";
            isValid = false;
        } else {
            contactForm.message.classList.remove('error');
        }

        if (isValid) {
            feedback.textContent = "Form submitted successfully!";
            feedback.style.color = 'green';
            // Here you would typically send the form data via AJAX or reset the form
            contactForm.reset();
        }
    });

    // Real-time feedback for form inputs
    ['name', 'email', 'message'].forEach(field => {
        const input = contactForm[field];
        input.addEventListener('input', function() {
            this.classList.remove('error');
            feedback.textContent = ''; // Clear previous feedback
        });
    });
});