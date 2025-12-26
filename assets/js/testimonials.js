/**
 * Medplus Pharmacy - Testimonials Carousel
 * Handles testimonial rotation and interaction
 */

// Testimonial state
let currentTestimonial = 0;
let testimonialInterval;
let isAutoPlaying = true;
let testimonials = [];
let indicators = [];

// Initialize testimonials
document.addEventListener('DOMContentLoaded', function() {
    initTestimonials();
});

/**
 * Initialize testimonials carousel
 */
function initTestimonials() {
    testimonials = document.querySelectorAll('.testimonial');
    indicators = document.querySelectorAll('.indicator');
    
    if (testimonials.length === 0) return;
    
    // Set up initial state
    setupInitialTestimonial();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start auto-rotation
    startAutoRotation();
    
    // Pause on hover/focus
    setupPauseOnInteraction();
}

/**
 * Set up initial testimonial state
 */
function setupInitialTestimonial() {
    // Hide all testimonials except the first
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.toggle('active', index === 0);
        testimonial.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === 0);
        indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    // Update current testimonial index
    currentTestimonial = 0;
}

/**
 * Set up event listeners for testimonials
 */
function setupEventListeners() {
    // Next button
    const nextBtn = document.getElementById('next-testimonial');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeTestimonial(1));
    }
    
    // Previous button
    const prevBtn = document.getElementById('prev-testimonial');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeTestimonial(-1));
    }
    
    // Indicator buttons
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToTestimonial(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleTestimonialKeyboard);
    
    // Touch events for mobile
    setupTouchEvents();
}

/**
 * Set up pause on interaction
 */
function setupPauseOnInteraction() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    
    if (!testimonialContainer) return;
    
    // Pause on mouse enter/focus
    testimonialContainer.addEventListener('mouseenter', pauseAutoRotation);
    testimonialContainer.addEventListener('focusin', pauseAutoRotation);
    
    // Resume on mouse leave/blur
    testimonialContainer.addEventListener('mouseleave', startAutoRotation);
    testimonialContainer.addEventListener('focusout', startAutoRotation);
}

/**
 * Change testimonial
 */
function changeTestimonial(direction) {
    const totalTestimonials = testimonials.length;
    
    // Calculate new index
    let newIndex = currentTestimonial + direction;
    
    // Wrap around
    if (newIndex >= totalTestimonials) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalTestimonials - 1;
    }
    
    // Update current testimonial
    updateTestimonial(newIndex);
    
    // Reset auto-rotation timer
    resetAutoRotation();
}

/**
 * Go to specific testimonial
 */
function goToTestimonial(index) {
    if (index >= 0 && index < testimonials.length) {
        updateTestimonial(index);
        resetAutoRotation();
    }
}

/**
 * Update testimonial display
 */
function updateTestimonial(index) {
    // Update current index
    currentTestimonial = index;
    
    // Update testimonials
    testimonials.forEach((testimonial, i) => {
        const isActive = i === index;
        testimonial.classList.toggle('active', isActive);
        testimonial.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        const isActive = i === index;
        indicator.classList.toggle('active', isActive);
        indicator.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
}

/**
 * Handle keyboard navigation
 */
function handleTestimonialKeyboard(e) {
    // Only handle if focus is on testimonial container or its children
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (!testimonialContainer || !testimonialContainer.contains(document.activeElement)) {
        return;
    }
    
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            changeTestimonial(1);
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            changeTestimonial(-1);
            break;
        case 'Home':
            e.preventDefault();
            goToTestimonial(0);
            break;
        case 'End':
            e.preventDefault();
            goToTestimonial(testimonials.length - 1);
            break;
    }
}

/**
 * Set up touch events for mobile
 */
function setupTouchEvents() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (!testimonialContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum pixels to register swipe
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                changeTestimonial(1);
            } else {
                // Swipe right - previous testimonial
                changeTestimonial(-1);
            }
        }
    }
}

/**
 * Start auto-rotation
 */
function startAutoRotation() {
    if (testimonials.length <= 1) return;
    
    isAutoPlaying = true;
    clearInterval(testimonialInterval);
    
    testimonialInterval = setInterval(() => {
        if (isAutoPlaying) {
            changeTestimonial(1);
        }
    }, 5000); // Change every 5 seconds
}

/**
 * Pause auto-rotation
 */
function pauseAutoRotation() {
    isAutoPlaying = false;
    clearInterval(testimonialInterval);
}

/**
 * Reset auto-rotation timer
 */
function resetAutoRotation() {
    pauseAutoRotation();
    setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
            startAutoRotation();
        }
    }, 2000); // Wait 2 seconds before resuming
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible, resume auto-rotation after a short delay
        setTimeout(startAutoRotation, 1000);
    } else {
        // Page became hidden, pause auto-rotation
        pauseAutoRotation();
    }
});

/**
 * Add smooth transitions with AOS-like functionality
 */
function addSmoothTransitions() {
    testimonials.forEach(testimonial => {
        testimonial.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

/**
 * Initialize smooth transitions
 */
addSmoothTransitions();

/**
 * Public API for external control
 */
window.testimonialsAPI = {
    next: () => changeTestimonial(1),
    prev: () => changeTestimonial(-1),
    goTo: (index) => goToTestimonial(index),
    start: () => startAutoRotation(),
    pause: () => pauseAutoRotation(),
    resume: () => {
        if (document.visibilityState === 'visible') {
            startAutoRotation();
        }
    },
    getCurrentIndex: () => currentTestimonial,
    getTotalCount: () => testimonials.length
};

/**
 * Enhanced testimonial features
 */
class TestimonialManager {
    constructor() {
        this.testimonials = [];
        this.currentIndex = 0;
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        this.testimonials = Array.from(document.querySelectorAll('.testimonial'));
        this.setupObservers();
    }
    
    setupObservers() {
        // Intersection Observer for lazy loading testimonial content
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadTestimonialContent(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            this.testimonials.forEach(testimonial => {
                observer.observe(testimonial);
            });
        }
    }
    
    loadTestimonialContent(testimonial) {
        // Add any dynamic content loading here
        // For now, testimonials are static
    }
    
    // Additional methods for future enhancements
    addTestimonial(content) {
        // Method to dynamically add testimonials
    }
    
    removeTestimonial(index) {
        // Method to remove testimonials
    }
    
    shuffleTestimonials() {
        // Method to randomize testimonial order
    }
}

// Initialize enhanced testimonial manager
const testimonialManager = new TestimonialManager();

/**
 * Performance optimizations
 */
function optimizeTestimonialPerformance() {
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate testimonial dimensions if needed
            resetAutoRotation();
        }, 250);
    });
    
    // Optimize animation frames
    let animationFrameId;
    function animateTestimonials() {
        // Animation logic here if needed
        animationFrameId = requestAnimationFrame(animateTestimonials);
    }
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(animateTestimonials);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
        clearInterval(testimonialInterval);
    });
}

// Initialize performance optimizations
optimizeTestimonialPerformance();