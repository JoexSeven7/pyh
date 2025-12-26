/**
 * Medplus Pharmacy - Accessibility Enhancements
 * Handles keyboard navigation, screen reader support, and accessibility features
 */

// Accessibility state
let focusTrapActive = false;
let skipLinkTimeout;
let highContrastMode = false;
let reducedMotionMode = false;

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initKeyboardNavigation();
    initScreenReaderSupport();
    initFocusManagement();
    initHighContrastMode();
    initReducedMotionMode();
    initSkipLinks();
    initARIAStates();
});

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Set up global accessibility shortcuts
    document.addEventListener('keydown', handleGlobalShortcuts);
    
    // Initialize focus management
    initFocusManagement();
    
    // Set up announcements for screen readers
    setupLiveAnnouncements();
    
    // Initialize skip links
    initSkipLinks();
}

/**
 * Initialize keyboard navigation
 */
function initKeyboardNavigation() {
    // Enhanced keyboard navigation for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    
    interactiveElements.forEach(element => {
        // Add keyboard event listeners
        element.addEventListener('keydown', handleKeyboardNavigation);
        
        // Add focus indicators
        element.addEventListener('focus', addFocusIndicator);
        element.addEventListener('blur', removeFocusIndicator);
    });
    
    // Custom keyboard navigation for complex components
    initCustomKeyboardNavigation();
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(e) {
    const target = e.target;
    const key = e.key;
    
    // Skip if not a navigation key
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab', 'Enter', 'Space'].includes(key)) {
        return;
    }
    
    // Handle specific component navigation
    if (target.closest('.nav-menu')) {
        handleMenuNavigation(e, target);
    } else if (target.closest('.testimonial-container')) {
        handleTestimonialNavigation(e, target);
    } else if (target.closest('.form-group')) {
        handleFormNavigation(e, target);
    }
    
    // Global shortcuts
    handleGlobalShortcuts(e);
}

/**
 * Handle menu navigation
 */
function handleMenuNavigation(e, target) {
    const menu = target.closest('.nav-menu');
    const items = menu.querySelectorAll('.nav-link');
    const currentIndex = Array.from(items).indexOf(target);
    
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex].focus();
            break;
            
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            items[prevIndex].focus();
            break;
            
        case 'Home':
            e.preventDefault();
            items[0].focus();
            break;
            
        case 'End':
            e.preventDefault();
            items[items.length - 1].focus();
            break;
    }
}

/**
 * Handle testimonial navigation
 */
function handleTestimonialNavigation(e, target) {
    const container = target.closest('.testimonial-container');
    
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Enter':
        case 'Space':
            e.preventDefault();
            window.testimonialsAPI?.next();
            break;
            
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            window.testimonialsAPI?.prev();
            break;
    }
}

/**
 * Handle form navigation
 */
function handleFormNavigation(e, target) {
    const form = target.closest('form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea, button');
    const currentIndex = Array.from(inputs).indexOf(target);
    
    switch (e.key) {
        case 'Enter':
            if (target.type !== 'textarea') {
                e.preventDefault();
                const nextInput = inputs[currentIndex + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
            break;
    }
}

/**
 * Handle global shortcuts
 */
function handleGlobalShortcuts(e) {
    // Ctrl + Home: Skip to main content
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Ctrl + End: Skip to footer
    if ((e.ctrlKey || e.metaKey) && e.key === 'End') {
        e.preventDefault();
        const footer = document.querySelector('footer');
        if (footer) {
            footer.focus();
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Alt + 1-5: Quick navigation
    if (e.altKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const sections = ['home', 'services', 'about', 'contact', 'faq'];
        const sectionId = sections[parseInt(e.key) - 1];
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

/**
 * Initialize screen reader support
 */
function initScreenReaderSupport() {
    // Add ARIA labels to interactive elements
    addARIALabels();
    
    // Set up live regions for dynamic content
    setupLiveRegions();
    
    // Add descriptive text for icons
    addIconDescriptions();
}

/**
 * Add ARIA labels to interactive elements
 */
function addARIALabels() {
    // Navigation
    const nav = document.querySelector('.navbar');
    if (nav) {
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Skip link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.setAttribute('aria-label', 'Skip to main content');
    }
    
    // Form elements
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        form.setAttribute('aria-label', `Form ${index + 1}`);
    });
    
    // Buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
}

/**
 * Set up live regions for dynamic content
 */
function setupLiveRegions() {
    // Create live region for announcements
    let liveRegion = document.getElementById('live-region');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }
}

/**
 * Add icon descriptions
 */
function addIconDescriptions() {
    const icons = document.querySelectorAll('i[class*="fa-"]');
    icons.forEach(icon => {
        const className = icon.className;
        let description = '';
        
        if (className.includes('fa-phone')) {
            description = 'Phone';
        } else if (className.includes('fa-whatsapp')) {
            description = 'WhatsApp';
        } else if (className.includes('fa-map-marker')) {
            description = 'Location';
        } else if (className.includes('fa-clock')) {
            description = 'Time';
        } else if (className.includes('fa-plus')) {
            description = 'Plus';
        } else if (className.includes('fa-arrow')) {
            description = 'Arrow';
        }
        
        if (description && !icon.getAttribute('aria-label')) {
            icon.setAttribute('aria-label', description);
        }
    });
}

/**
 * Initialize focus management
 */
function initFocusManagement() {
    // Trap focus in modal dialogs (when implemented)
    document.addEventListener('keydown', trapFocus);
    
    // Manage focus after dynamic content changes
    document.addEventListener('DOMContentLoaded', manageInitialFocus);
}

/**
 * Trap focus within modal dialogs
 */
function trapFocus(e) {
    if (!focusTrapActive) return;
    
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

/**
 * Manage initial focus
 */
function manageInitialFocus() {
    // Focus on skip link for keyboard users
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('focus', () => {
            // Remove focus trap if active
            focusTrapActive = false;
        });
    }
}

/**
 * Add focus indicators
 */
function addFocusIndicator(e) {
    const target = e.target;
    target.style.outline = '3px solid var(--pharmacy-blue)';
    target.style.outlineOffset = '2px';
}

/**
 * Remove focus indicators
 */
function removeFocusIndicator(e) {
    const target = e.target;
    target.style.outline = '';
    target.style.outlineOffset = '';
}

/**
 * Initialize high contrast mode
 */
function initHighContrastMode() {
    // Check for high contrast preference
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    function handleContrastChange(e) {
        highContrastMode = e.matches;
        
        if (highContrastMode) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }
    
    // Initial check
    handleContrastChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleContrastChange);
}

/**
 * Initialize reduced motion mode
 */
function initReducedMotionMode() {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionChange(e) {
        reducedMotionMode = e.matches;
        
        if (reducedMotionMode) {
            document.body.classList.add('reduced-motion');
            // Remove all animations
            document.querySelectorAll('*').forEach(element => {
                element.style.animation = 'none';
                element.style.transition = 'none';
            });
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    // Initial check
    handleMotionChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleMotionChange);
}

/**
 * Initialize skip links
 */
function initSkipLinks() {
    const skipLinks = document.querySelectorAll('.skip-link');
    
    skipLinks.forEach(skipLink => {
        skipLink.addEventListener('click', (e) => {
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.focus();
            }
        });
    });
}

/**
 * Set up live announcements
 */
function setupLiveAnnouncements() {
    window.announceToScreenReader = function(message, priority = 'polite') {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.setAttribute('aria-live', priority);
            liveRegion.textContent = message;
            
            // Clear after a short delay
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    };
}

/**
 * Initialize ARIA states
 */
function initARIAStates() {
    // Set up ARIA states for interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-expanded')) {
            button.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Set up ARIA states for collapsible elements
    const collapsibles = document.querySelectorAll('[data-collapsible]');
    collapsibles.forEach(collapse => {
        const trigger = collapse.querySelector('[data-trigger]');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-controls', collapse.id);
        }
    });
}

/**
 * Initialize custom keyboard navigation
 */
function initCustomKeyboardNavigation() {
    // Handle custom components that need special keyboard handling
    const customComponents = document.querySelectorAll('[data-keyboard-navigation]');
    
    customComponents.forEach(component => {
        component.addEventListener('keydown', (e) => {
            const key = e.key;
            const items = component.querySelectorAll('[tabindex="0"], a, button');
            const currentIndex = Array.from(items).indexOf(document.activeElement);
            
            switch (key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex].focus();
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex].focus();
                    break;
            }
        });
    });
}

/**
 * Utility function to announce messages to screen readers
 */
function announceMessage(message, priority = 'polite') {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.textContent = message;
        
        // Clear after a short delay
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

/**
 * Utility function to check if element is visible
 */
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

/**
 * Utility function to focus on element
 */
function focusElement(element) {
    if (element && typeof element.focus === 'function') {
        element.focus();
        
        // Ensure element is visible
        if (!isElementVisible(element)) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * Initialize all accessibility features
 */
function initAllAccessibilityFeatures() {
    initAccessibility();
    initKeyboardNavigation();
    initScreenReaderSupport();
    initFocusManagement();
    initHighContrastMode();
    initReducedMotionMode();
    initSkipLinks();
    initARIAStates();
    setupLiveAnnouncements();
}

// Initialize all accessibility features
initAllAccessibilityFeatures();

/**
 * Public API for accessibility functions
 */
window.accessibilityAPI = {
    announceMessage: announceMessage,
    focusElement: focusElement,
    isElementVisible: isElementVisible,
    addFocusIndicator: addFocusIndicator,
    removeFocusIndicator: removeFocusIndicator,
    trapFocus: trapFocus,
    manageInitialFocus: manageInitialFocus
};