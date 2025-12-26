/**
 * Medplus Pharmacy - FAQ Functionality
 * Handles FAQ search, category filtering, and accordion interactions
 */

// FAQ state
let faqItems = [];
let categoryTabs = [];
let currentCategory = 'hours';
let searchTimeout;

// Initialize FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initSearch();
    initCategoryFiltering();
    initAccordion();
    initSchemaMarkup();
});

/**
 * Initialize FAQ functionality
 */
function initFAQ() {
    faqItems = Array.from(document.querySelectorAll('.faq-item'));
    categoryTabs = Array.from(document.querySelectorAll('.category-tab'));
    
    if (faqItems.length === 0) return;
    
    // Set up initial state
    setupInitialFAQState();
    
    // Add schema markup for SEO
    addSchemaMarkup();
}

/**
 * Set up initial FAQ state
 */
function setupInitialFAQState() {
    // Get current category from URL hash or default to 'hours'
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
        const category = hash.substring(1);
        if (isValidCategory(category)) {
            currentCategory = category;
            updateCategoryUI(category);
            showCategory(category);
        }
    }
    
    // Update active tab
    updateActiveTab(currentCategory);
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('faq-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        const results = performSearch(query);
        displaySearchResults(results, searchResults);
    }, 300));
    
    // Clear search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    });
}

/**
 * Perform search across all FAQ items
 */
function performSearch(query) {
    const results = [];
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(query) || answer.includes(query)) {
            results.push({
                question: item.querySelector('.faq-question span').textContent,
                answer: item.querySelector('.faq-answer').innerHTML,
                category: item.closest('.faq-panel').id.replace('-panel', ''),
                element: item
            });
        }
    });
    
    return results;
}

/**
 * Display search results
 */
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
        container.style.display = 'block';
        return;
    }
    
    const html = results.map(result => `
        <div class="search-result-item">
            <h4>${result.question}</h4>
            <p>${result.answer.substring(0, 150)}...</p>
            <button class="view-answer-btn" data-question="${result.question}">
                View Answer
            </button>
        </div>
    `).join('');
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // Add event listeners to view answer buttons
    container.querySelectorAll('.view-answer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.getAttribute('data-question');
            scrollToQuestion(question);
        });
    });
}

/**
 * Scroll to specific question
 */
function scrollToQuestion(questionText) {
    const questionElement = Array.from(document.querySelectorAll('.faq-question span'))
        .find(span => span.textContent === questionText);
    
    if (questionElement) {
        const faqItem = questionElement.closest('.faq-item');
        const category = faqItem.closest('.faq-panel').id.replace('-panel', '');
        
        // Switch to correct category
        updateCategoryUI(category);
        showCategory(category);
        
        // Expand the question
        const questionBtn = faqItem.querySelector('.faq-question');
        questionBtn.setAttribute('aria-expanded', 'true');
        questionBtn.nextElementSibling.style.display = 'block';
        questionBtn.nextElementSibling.setAttribute('aria-hidden', 'false');
        
        // Scroll to the question
        faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Initialize category filtering
 */
function initCategoryFiltering() {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category') || e.target.closest('.category-tab').getAttribute('data-category');
            switchCategory(category);
        });
    });
    
    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (isValidCategory(hash)) {
            switchCategory(hash);
        }
    });
}

/**
 * Switch to different category
 */
function switchCategory(category) {
    if (!isValidCategory(category)) return;
    
    currentCategory = category;
    
    // Update URL hash
    window.location.hash = category;
    
    // Update UI
    updateCategoryUI(category);
    showCategory(category);
    
    // Scroll to FAQ section
    const faqSection = document.querySelector('.faq-categories');
    if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Update category UI
 */
function updateCategoryUI(category) {
    // Update tab states
    categoryTabs.forEach(tab => {
        const isActive = tab.getAttribute('data-category') === category;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive.toString());
    });
    
    // Update panel states
    const panels = document.querySelectorAll('.faq-panel');
    panels.forEach(panel => {
        const isActive = panel.id === category + '-panel';
        panel.classList.toggle('active', isActive);
    });
}

/**
 * Show specific category
 */
function showCategory(category) {
    const panels = document.querySelectorAll('.faq-panel');
    panels.forEach(panel => {
        panel.style.display = panel.id === category + '-panel' ? 'block' : 'none';
    });
}

/**
 * Initialize accordion functionality
 */
function initAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(question => {
        question.addEventListener('click', () => {
            toggleAccordion(question);
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(question);
            }
        });
    });
}

/**
 * Toggle accordion item
 */
function toggleAccordion(question) {
    const answer = question.nextElementSibling;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other items in the same category
    const categoryPanel = question.closest('.faq-panel');
    const otherQuestions = categoryPanel.querySelectorAll('.faq-question');
    
    otherQuestions.forEach(q => {
        if (q !== question) {
            q.setAttribute('aria-expanded', 'false');
            q.nextElementSibling.style.display = 'none';
            q.nextElementSibling.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Toggle current item
    question.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    answer.style.display = isExpanded ? 'none' : 'block';
    answer.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
    
    // Update icon rotation
    const icon = question.querySelector('i');
    if (icon) {
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

/**
 * Add schema markup for SEO
 */
function addSchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    };
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent;
        const answer = item.querySelector('.faq-answer').textContent;
        
        schemaData.mainEntity.push({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
            }
        });
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);
}

/**
 * Utility function to check if category is valid
 */
function isValidCategory(category) {
    const validCategories = ['hours', 'ordering', 'prescriptions', 'products', 'payment', 'general'];
    return validCategories.includes(category);
}

/**
 * Utility function to update active tab
 */
function updateActiveTab(category) {
    categoryTabs.forEach(tab => {
        const isActive = tab.getAttribute('data-category') === category;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive.toString());
    });
}

/**
 * Utility function to debounce functions
 */
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

/**
 * Initialize all FAQ features
 */
function initAllFAQFeatures() {
    initFAQ();
    initSearch();
    initCategoryFiltering();
    initAccordion();
    addSchemaMarkup();
}

// Initialize all FAQ features
initAllFAQFeatures();

/**
 * Public API for FAQ functionality
 */
window.faqAPI = {
    switchCategory: switchCategory,
    scrollToQuestion: scrollToQuestion,
    performSearch: performSearch,
    toggleAccordion: toggleAccordion,
    getCurrentCategory: () => currentCategory,
    getFAQItems: () => faqItems,
    getCategories: () => categoryTabs
};