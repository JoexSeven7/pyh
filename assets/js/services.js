/**
 * Medplus Pharmacy - Services Page Functionality
 * Handles service category filtering, animations, and interactive features
 */

// Services state
let serviceCategories = [];
let currentServiceCategory = 'all';
let serviceItems = [];

// Initialize services functionality
document.addEventListener('DOMContentLoaded', function() {
    initServices();
    initServiceFiltering();
    initServiceAnimations();
    initServiceProcess();
    initServiceTestimonials();
});

/**
 * Initialize services functionality
 */
function initServices() {
    serviceCategories = Array.from(document.querySelectorAll('.service-category'));
    serviceItems = Array.from(document.querySelectorAll('.service-item'));
    
    if (serviceCategories.length === 0) return;
    
    // Set up initial state
    setupInitialServicesState();
    
    // Add schema markup for services
    addServiceSchemaMarkup();
}

/**
 * Set up initial services state
 */
function setupInitialServicesState() {
    // Initialize all service categories as visible
    serviceCategories.forEach(category => {
        category.style.display = 'block';
    });
    
    // Initialize all service items with animations
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Add staggered animation delay
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Initialize service filtering
 */
function initServiceFiltering() {
    const filterButtons = document.querySelectorAll('.service-filter-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category') || e.target.closest('.service-filter-btn').getAttribute('data-category');
            filterServices(category);
        });
    });
}

/**
 * Filter services by category
 */
function filterServices(category) {
    if (category === 'all') {
        // Show all services
        serviceCategories.forEach(category => {
            category.style.display = 'block';
            category.style.animation = 'fadeInUp 0.6s ease-out';
        });
        
        // Update active button
        updateActiveFilter('all');
        return;
    }
    
    // Hide all categories first
    serviceCategories.forEach(cat => {
        cat.style.display = 'none';
    });
    
    // Show only the selected category
    const selectedCategory = document.querySelector(`.service-category[data-category="${category}"]`);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
        selectedCategory.style.animation = 'fadeInUp 0.6s ease-out';
    }
    
    // Update active button
    updateActiveFilter(category);
}

/**
 * Update active filter button
 */
function updateActiveFilter(category) {
    const filterButtons = document.querySelectorAll('.service-filter-btn');
    
    filterButtons.forEach(button => {
        const isActive = button.getAttribute('data-category') === category;
        button.classList.toggle('active', isActive);
    });
}

/**
 * Initialize service animations
 */
function initServiceAnimations() {
    // Add hover effects to service items
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 8px 24px rgba(0, 102, 204, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
    
    // Add click animations for service items
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add pulse animation
            item.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                item.style.animation = '';
            }, 500);
        });
    });
}

/**
 * Initialize service process animations
 */
function initServiceProcess() {
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length === 0) return;
    
    // Add sequential animation to process steps
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Initialize service testimonials
 */
function initServiceTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-service-testimonial');
    const nextBtn = document.getElementById('next-service-testimonial');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    // Set up initial state
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.toggle('active', index === 0);
        testimonial.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    });
    
    // Set up navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateServiceTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateServiceTestimonial(currentIndex);
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateServiceTestimonial(currentIndex);
    }, 5000);
}

/**
 * Update service testimonial
 */
function updateServiceTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
        testimonial.setAttribute('aria-hidden', i !== index ? 'true' : 'false');
    });
}

/**
 * Add schema markup for services
 */
function addServiceSchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Pharmacy Services",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Medplus Pharmacy",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "32 Emmanuel Keshi Street",
                "addressLocality": "Ikosi Ketu",
                "addressRegion": "Lagos",
                "postalCode": "105102",
                "addressCountry": "NG"
            },
            "telephone": "+2349055492610",
            "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Pharmacy Services",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "Prescription Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Prescription Medications"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Prescription Refills"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Medication Delivery"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Beauty & Wellness",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Skincare Products"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Cosmetics & Makeup"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Vitamins & Supplements"
                            }
                        }
                    ]
                }
            ]
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);
}

/**
 * Initialize service comparison features
 */
function initServiceComparison() {
    const comparisonTables = document.querySelectorAll('.service-comparison');
    
    comparisonTables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'rgba(45, 190, 96, 0.1)';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
    });
}

/**
 * Initialize service booking functionality
 */
function initServiceBooking() {
    const bookingButtons = document.querySelectorAll('.book-service-btn');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceName = e.target.getAttribute('data-service') || e.target.closest('.book-service-btn').getAttribute('data-service');
            
            // Show booking modal or redirect to contact
            showServiceBooking(serviceName);
        });
    });
}

/**
 * Show service booking modal
 */
function showServiceBooking(serviceName) {
    // Create booking modal
    const modal = document.createElement('div');
    modal.className = 'service-booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">×</span>
            <h3>Book ${serviceName}</h3>
            <p>Fill out the form below to book this service:</p>
            <form class="booking-form">
                <div class="form-group">
                    <label for="booking-name">Your Name</label>
                    <input type="text" id="booking-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="booking-phone">Phone Number</label>
                    <input type="tel" id="booking-phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="booking-service">Service</label>
                    <input type="text" id="booking-service" name="service" value="${serviceName}" readonly>
                </div>
                <div class="form-group">
                    <label for="booking-date">Preferred Date</label>
                    <input type="date" id="booking-date" name="date">
                </div>
                <div class="form-group">
                    <label for="booking-time">Preferred Time</label>
                    <input type="time" id="booking-time" name="time">
                </div>
                <div class="form-group">
                    <label for="booking-notes">Additional Notes</label>
                    <textarea id="booking-notes" name="notes" rows="3"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">Book Service</button>
                    <button type="button" class="btn btn-secondary close-modal">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: relative;
    `;
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-btn');
    const closeModalBtn = modal.querySelector('.close-modal');
    
    const closeModal = () => {
        modal.remove();
    };
    
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Add form submission
    const form = modal.querySelector('.booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle booking submission
        alert('Thank you! Your booking request has been submitted. We will contact you shortly.');
        closeModal();
    });
    
    document.body.appendChild(modal);
}

/**
 * Initialize all service features
 */
function initAllServiceFeatures() {
    initServices();
    initServiceFiltering();
    initServiceAnimations();
    initServiceProcess();
    initServiceTestimonials();
    initServiceComparison();
    initServiceBooking();
}

// Initialize all service features
initAllServiceFeatures();

/**
 * Public API for service functionality
 */
window.servicesAPI = {
    filterServices: filterServices,
    showServiceBooking: showServiceBooking,
    updateServiceTestimonial: updateServiceTestimonial,
    getCurrentCategory: () => currentServiceCategory,
    getServiceCategories: () => serviceCategories,
    getServiceItems: () => serviceItems
};