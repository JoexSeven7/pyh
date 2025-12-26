/**
 * Medplus Pharmacy - Navigation
 * Handles navigation menu, smooth scrolling, and active states
 */

// Navigation state
let navbar;
let navLinks;
let currentActiveLink = null;
let scrollTimeout;
let isScrolling = false;

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initActiveStates();
    initScrollSpy();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    navbar = document.querySelector('.navbar');
    navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar || !navLinks.length) return;
    
    // Add smooth scrolling to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Initialize active link based on URL hash
    updateActiveLinkFromHash();
}

/**
 * Handle navigation link clicks
 */
function handleNavLinkClick(e) {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Handle external links
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        return; // Let the browser handle external links
    }
    
    // Handle anchor links
    if (href.startsWith('#')) {
        e.preventDefault();
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        currentActiveLink = link;
        
        // Scroll to target
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            smoothScrollTo(targetElement);
        }
    }
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initSmoothScrolling() {
    // Handle all anchor links on the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an external link or has a different behavior
            if (href === '#' || href.startsWith('http') || this.classList.contains('skip-link')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

/**
 * Initialize active states for navigation
 */
function initActiveStates() {
    // Update active state on scroll
    window.addEventListener('scroll', throttle(updateActiveStateOnScroll, 100));
    
    // Update active state on hash change
    window.addEventListener('hashchange', updateActiveLinkFromHash);
    
    // Update active state on load
    updateActiveStateOnScroll();
}

/**
 * Update active state based on current scroll position
 */
function updateActiveStateOnScroll() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    
    // Find the section that's currently in view
    let currentSection = null;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section;
            break;
        }
    }
    
    // Update navigation active state
    if (currentSection) {
        updateActiveLink(currentSection.id);
    }
}

/**
 * Update active link based on section ID
 */
function updateActiveLink(sectionId) {
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Find and activate the corresponding link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
        currentActiveLink = activeLink;
    }
}

/**
 * Update active link based on URL hash
 */
function updateActiveLinkFromHash() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        updateActiveLink(sectionId);
    }
}

/**
 * Initialize scroll spy functionality
 */
function initScrollSpy() {
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveLink(entry.target.id);
                }
            });
        }, {
            root: null,
            rootMargin: '-20% 0px -80% 0px', // Adjust sensitivity
            threshold: 0
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

/**
 * Handle scroll behavior
 */
function handleScrollBehavior() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    let navbarVisible = true;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (navbarVisible) {
                navbar.style.transform = 'translateY(-100%)';
                navbarVisible = false;
            }
        } else {
            // Scrolling up
            if (!navbarVisible) {
                navbar.style.transform = 'translateY(0)';
                navbarVisible = true;
            }
        }
        
        lastScrollTop = scrollTop;
    }, 10));
}

/**
 * Handle keyboard navigation for mobile menu
 */
function handleKeyboardNavigation(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Navigate with arrow keys when menu is open
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % focusableElements.length;
                focusableElements[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
                focusableElements[prevIndex].focus();
                break;
        }
    }
}

/**
 * Add loading states for navigation
 */
function addNavigationLoadingStates() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Add loading state
            link.style.opacity = '0.5';
            link.style.pointerEvents = 'none';
            
            // Remove loading state after a short delay
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.pointerEvents = 'auto';
            }, 1000);
        });
    });
}

/**
 * Initialize breadcrumb navigation (if needed)
 */
function initBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;
    
    // Update breadcrumbs based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const breadcrumbItems = breadcrumbs.querySelectorAll('.breadcrumb-item');
    
    breadcrumbItems.forEach(item => {
        if (item.dataset.page === currentPage) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Handle navigation animations
 */
function initNavigationAnimations() {
    // Animate navigation items on load
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
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

/**
 * Utility function to debounce functions
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
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
 * Initialize all navigation features
 */
function initAllNavigationFeatures() {
    initNavigation();
    initSmoothScrolling();
    initActiveStates();
    initScrollSpy();
    handleScrollBehavior();
    addNavigationLoadingStates();
    initBreadcrumbs();
    initNavigationAnimations();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Initialize all navigation features
initAllNavigationFeatures();

/**
 * Public API for navigation control
 */
window.navigationAPI = {
    smoothScrollTo: smoothScrollTo,
    updateActiveLink: updateActiveLink,
    closeMobileMenu: closeMobileMenu,
    getCurrentActiveLink: () => currentActiveLink,
    getNavLinks: () => navLinks
};