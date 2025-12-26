/**
 * Medplus Pharmacy - Form Validation
 * Handles all form validation and submission logic
 */

// Form validation patterns
const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{10,500}$/
};

// Error messages
const errorMessages = {
    required: 'This field is required',
    name: 'Please enter a valid name (2-50 characters)',
    phone: 'Please enter a valid phone number',
    email: 'Please enter a valid email address',
    message: 'Message must be between 10 and 500 characters',
    inquiryType: 'Please select an inquiry type',
    general: 'Please check your information and try again'
};

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});

/**
 * Initialize form validation for all forms
 */
function initFormValidation() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        setupFormValidation(contactForm, validateContactForm, submitContactForm);
    }
    
    // Newsletter form validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        setupFormValidation(newsletterForm, validateNewsletterForm, submitNewsletterForm);
    }
}

/**
 * Setup form validation for a specific form
 */
function setupFormValidation(form, validateFunction, submitFunction) {
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input, validateFunction));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateFunction(form)) {
            submitFunction(form);
        }
    });
}

/**
 * Validate contact form
 */
function validateContactForm(form) {
    let isValid = true;
    const formData = new FormData(form);
    
    // Validate name
    const name = formData.get('name');
    if (!name || !validationPatterns.name.test(name)) {
        showError(form.querySelector('#name'), errorMessages.name);
        isValid = false;
    }
    
    // Validate phone
    const phone = formData.get('phone');
    if (!phone || !validationPatterns.phone.test(phone.replace(/\D/g, ''))) {
        showError(form.querySelector('#phone'), errorMessages.phone);
        isValid = false;
    }
    
    // Validate email (optional)
    const email = formData.get('email');
    if (email && !validationPatterns.email.test(email)) {
        showError(form.querySelector('#email'), errorMessages.email);
        isValid = false;
    }
    
    // Validate message
    const message = formData.get('message');
    if (!message || !validationPatterns.message.test(message)) {
        showError(form.querySelector('#message'), errorMessages.message);
        isValid = false;
    }
    
    // Validate inquiry type
    const inquiryType = formData.get('inquiry-type');
    if (!inquiryType) {
        showError(form.querySelector('#inquiry-type'), errorMessages.inquiryType);
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate newsletter form
 */
function validateNewsletterForm(form) {
    let isValid = true;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showError(emailInput, errorMessages.email);
        isValid = false;
    } else if (!validationPatterns.email.test(email)) {
        showError(emailInput, errorMessages.email);
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field, validateFunction) {
    const form = field.closest('form');
    const fieldName = field.name;
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showError(field, errorMessages.required);
        return false;
    }
    
    // Validate based on field type
    switch (fieldName) {
        case 'name':
            if (value && !validationPatterns.name.test(value)) {
                showError(field, errorMessages.name);
                return false;
            }
            break;
            
        case 'phone':
            if (value && !validationPatterns.phone.test(value.replace(/\D/g, ''))) {
                showError(field, errorMessages.phone);
                return false;
            }
            break;
            
        case 'email':
            if (value && !validationPatterns.email.test(value)) {
                showError(field, errorMessages.email);
                return false;
            }
            break;
            
        case 'message':
            if (value && !validationPatterns.message.test(value)) {
                showError(field, errorMessages.message);
                return false;
            }
            break;
            
        case 'inquiry-type':
            if (!value) {
                showError(field, errorMessages.inquiryType);
                return false;
            }
            break;
    }
    
    return true;
}

/**
 * Show error for a field
 */
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.id);
    
    // Add visual indicators
    formGroup.classList.add('error');
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = 'rgba(231, 76, 60, 0.05)';
}

/**
 * Clear error for a field
 */
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    // Remove visual indicators
    formGroup.classList.remove('error');
    field.style.borderColor = '';
    field.style.backgroundColor = '';
}

/**
 * Submit contact form
 */
async function submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        const response = await simulateFormSubmission(data);
        
        if (response.success) {
            // Show success message
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you within 1 hour.');
            
            // Reset form
            form.reset();
            
            // Clear all errors
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.classList.remove('error');
                field.style.borderColor = '';
                field.style.backgroundColor = '';
            });
            
        } else {
            throw new Error(response.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or call us directly at 0905 549 2610.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Submit newsletter form
 */
async function submitNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        const response = await simulateNewsletterSubscription(email);
        
        if (response.success) {
            // Show success message
            showFormMessage('success', 'Thank you! You have been successfully subscribed to our newsletter.', 'newsletter-form');
            form.reset();
        } else {
            throw new Error(response.message || 'Subscription failed');
        }
        
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        showFormMessage('error', 'Sorry, there was an error subscribing you to our newsletter. Please try again.', 'newsletter-form');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Simulate form submission (for demo purposes)
 */
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    message: 'Message sent successfully'
                });
            } else {
                reject(new Error('Server error'));
            }
        }, 1500);
    });
}

/**
 * Simulate newsletter subscription (for demo purposes)
 */
function simulateNewsletterSubscription(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve({
                    success: true,
                    message: 'Subscribed successfully'
                });
            } else {
                reject(new Error('Subscription failed'));
            }
        }, 1000);
    });
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
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    // Scroll to message if needed
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Format phone number for display
 */
function formatPhoneNumber(phone) {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Nigerian numbers
    if (cleaned.length === 13 && cleaned.startsWith('+234')) {
        return cleaned.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, '+234 $1 $2 $3');
    } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return cleaned.replace(/(0)(\d{3})(\d{3})(\d{4})/, '+234 $2 $3 $4');
    }
    
    // International format
    return phone;
}

/**
 * Validate Nigerian phone number
 */
function validateNigerianPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    // Check for valid Nigerian number patterns
    const patterns = [
        /^0\d{10}$/,           // 08012345678
        /^234\d{10}$/,         // 2348012345678
        /^\+234\d{10}$/        // +2348012345678
    ];
    
    return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Auto-format phone number as user types
 */
function setupPhoneFormatting(input) {
    if (!input) return;
    
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Auto-format Nigerian numbers
        if (value.length >= 3) {
            if (value.startsWith('0')) {
                value = value.replace(/(0)(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3 $4');
            } else if (value.startsWith('234')) {
                value = value.replace(/(234)(\d{3})(\d{3})(\d{0,4})/, '+$1 $2 $3 $4');
            }
        }
        
        e.target.value = value;
    });
}

// Initialize phone formatting for phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => setupPhoneFormatting(input));
});

// Export functions for use in other modules
window.medplusValidation = {
    validateNigerianPhone,
    formatPhoneNumber,
    validateEmail: (email) => validationPatterns.email.test(email),
    validateName: (name) => validationPatterns.name.test(name),
    validateMessage: (message) => validationPatterns.message.test(message)
};