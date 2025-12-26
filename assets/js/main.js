/**
 * Medplus Pharmacy - Main JavaScript
 * Handles core functionality and initialization
 */

// DOM Elements
let navbar;
let hamburger;
let navMenu;
let backToTopBtn;
let whatsappFloat;
let callFloat;
let loadingOverlay;

// State
let isMenuOpen = false;
let ticking = false;
let tickingScroll = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initElements();
    initEventListeners();
    initAnimations();
    checkScrollPosition();
    handleMobileDetection();
    initLazyLoading();
    initThemeDetection();
});

/**
 * Initialize DOM elements
 */
function initElements() {
    navbar = document.querySelector('.navbar');
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    backToTopBtn = document.getElementById('back-to-top');
    whatsappFloat = document.querySelector('.whatsapp-float');
    callFloat = document.querySelector('.call-float');
    loadingOverlay = document.getElementById('loading-overlay');
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Scroll events
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Order delivery button
    const orderDeliveryBtn = document.getElementById('order-delivery-btn');
    if (orderDeliveryBtn) {
        orderDeliveryBtn.addEventListener('click', handleOrderDelivery);
    }
}

/**
 * Initialize animations and AOS
 */
function initAnimations() {
    // Simple intersection observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

/**
 * Handle mobile menu toggle
 */
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (hamburger) {
        hamburger.classList.toggle('active', isMenuOpen);
    }
    
    if (navMenu) {
        navMenu.classList.toggle('active', isMenuOpen);
    }
    
    // Update aria-expanded attribute
    if (hamburger) {
        hamburger.setAttribute('aria-expanded', isMenuOpen.toString());
    }
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    isMenuOpen = false;
    
    if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    document.body.style.overflow = '';
}

/**
 * Handle scroll events with throttling
 */
function requestScrollUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

/**
 * Update scroll-based effects
 */
function updateScrollEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar on scroll
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
    
    // Update floating elements based on scroll
    updateFloatingElements(scrollTop);
    
    ticking = false;
}

/**
 * Update floating elements position
 */
function updateFloatingElements(scrollTop) {
    if (!whatsappFloat || !callFloat) return;
    
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = scrollTop / (documentHeight - viewportHeight);
    
    // Adjust floating button positions based on scroll
    if (scrollTop > 100) {
        whatsappFloat.style.bottom = '20px';
        callFloat.style.bottom = '20px';
    } else {
        whatsappFloat.style.bottom = '24px';
        callFloat.style.bottom = '24px';
    }
}

/**
 * Scroll to top smoothly
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
    }
    
    // Skip to main content with Ctrl+Home
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
        }
    }
}

/**
 * Check scroll position on load
 */
function checkScrollPosition() {
    updateScrollEffects();
}

/**
 * Handle mobile device detection
 */
function handleMobileDetection() {
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Show call button on mobile
        if (callFloat) {
            callFloat.style.display = 'flex';
        }
        if (whatsappFloat) {
            whatsappFloat.style.display = 'none';
        }
    } else {
        // Show WhatsApp button on desktop
        if (whatsappFloat) {
            whatsappFloat.style.display = 'flex';
        }
        if (callFloat) {
            callFloat.style.display = 'none';
        }
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Initialize theme detection
 */
function initThemeDetection() {
    // Check for user preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Theme change handled by CSS media queries
        console.log('Theme changed to:', e.matches ? 'dark' : 'light');
    });
}

/**
 * Handle order delivery button click
 */
function handleOrderDelivery() {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Focus on the first form field
    const nameField = document.getElementById('name');
    if (nameField) {
        setTimeout(() => {
            nameField.focus();
        }, 1000);
    }
}

/**
 * Handle contact form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // This will be handled by form-validation.js
    // But we can add some basic validation here
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    showLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
        showLoading(false);
        showFormMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you within 1 hour.');
        form.reset();
    }, 2000);
}

/**
 * Handle newsletter form submission
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!emailInput || !emailInput.value) {
        showFormMessage('error', 'Please enter your email address.', 'newsletter-form');
        return;
    }
    
    // Simulate newsletter signup
    showFormMessage('success', 'Thank you! You have been subscribed to our newsletter.', 'newsletter-form');
    form.reset();
}

/**
 * Show loading overlay
 */
function showLoading(show) {
    if (!loadingOverlay) return;
    
    if (show) {
        loadingOverlay.classList.add('active');
        loadingOverlay.setAttribute('aria-hidden', 'false');
    } else {
        loadingOverlay.classList.remove('active');
        loadingOverlay.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Show form message
 */
function showFormMessage(type, message, formId = 'contact-form') {
    const form = document.getElementById(formId);
    if (!form) return;
    
    let messageDiv = form.querySelector('.form-message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        form.appendChild(messageDiv);
    }
    
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * Utility function to format phone numbers
 */
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Check if it's a Nigerian number
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '+234 $1 $2 $3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
}

/**
 * Utility function to validate email
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Utility function to debounce functions
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Utility function to throttle functions
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for use in other modules
window.medplus = {
    formatPhoneNumber,
    validateEmail,
    debounce,
    throttle,
    showLoading,
    showFormMessage
};