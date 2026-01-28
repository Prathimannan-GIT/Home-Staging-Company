// Home Staging Company - Main JavaScript File
// All interactive functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initTestimonialCarousel();
    initContactForm();
    initActiveNavigation();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const headerCenter = document.querySelector('.header-center');
    
    if (hamburger && headerCenter) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            headerCenter.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        headerCenter.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                headerCenter.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!headerCenter.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                headerCenter.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.card, section > div').forEach(el => {
        observer.observe(el);
    });
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('animate-fadeIn');
                        }, 100);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Before/After Slider for Virtual Staging
function initBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.slider-container');
        const afterImage = slider.querySelector('.after-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        
        if (container && afterImage && sliderHandle) {
            let isDragging = false;
            
            const updateSliderPosition = (x) => {
                const rect = container.getBoundingClientRect();
                const position = Math.max(0, Math.min(x - rect.left, rect.width));
                const percentage = (position / rect.width) * 100;
                
                afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                sliderHandle.style.left = `${percentage}%`;
            };
            
            // Mouse events
            sliderHandle.addEventListener('mousedown', () => isDragging = true);
            document.addEventListener('mouseup', () => isDragging = false);
            document.addEventListener('mousemove', (e) => {
                if (isDragging) updateSliderPosition(e.clientX);
            });
            
            // Touch events
            sliderHandle.addEventListener('touchstart', () => isDragging = true);
            document.addEventListener('touchend', () => isDragging = false);
            document.addEventListener('touchmove', (e) => {
                if (isDragging) updateSliderPosition(e.touches[0].clientX);
            });
            
            // Initialize slider at 50%
            updateSliderPosition(container.getBoundingClientRect().width / 2);
        }
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel && testimonials.length > 0) {
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };
        
        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        };
        
        const prevTestimonial = () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        };
        
        // Button events
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        
        // Dot events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto-play
        setInterval(nextTestimonial, 5000);
        
        // Initialize first testimonial
        showTestimonial(0);
    }
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const errors = {};
            
            // Name validation
            if (!data.name || data.name.trim().length < 2) {
                errors.name = 'Please enter your name (at least 2 characters)';
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email || !emailRegex.test(data.email)) {
                errors.email = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Phone validation (optional)
            if (data.phone && data.phone.trim()) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(data.phone)) {
                    errors.phone = 'Please enter a valid phone number';
                    isValid = false;
                }
            }
            
            // Message validation
            if (!data.message || data.message.trim().length < 10) {
                errors.message = 'Please enter a message (at least 10 characters)';
                isValid = false;
            }
            
            // Display errors or submit
            displayFormErrors(errors);
            
            if (isValid) {
                // Show success message
                showFormSuccess();
                this.reset();
            }
        });
    }
}

// Display form errors
function displayFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Display new errors
    Object.keys(errors).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errors[fieldName];
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            
            field.parentNode.appendChild(errorElement);
            field.style.borderColor = '#e74c3c';
        }
    });
}

// Show form success message
function showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #87a96b 0%, #a8c09a 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease-out;
    `;
    
    const form = document.querySelector('#contactForm');
    if (form) {
        form.parentNode.insertBefore(successMessage, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax effect for hero sections
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// Initialize parallax on load
window.addEventListener('load', initParallax);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.textContent = 'Image not available';
            placeholder.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f0f0f0;
                color: #666;
                height: ${this.height || 200}px;
                border-radius: 8px;
                font-size: 0.875rem;
            `;
            this.parentNode.appendChild(placeholder);
        });
    });
});
