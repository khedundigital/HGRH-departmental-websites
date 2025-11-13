// Main JavaScript for Harry Gwala Paediatrics Website

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeApp();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize accessibility features
    initializeAccessibility();
});

// Initialize app
function initializeApp() {
    console.log('Harry Gwala Paediatrics Website initialized');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark', savedTheme === 'dark');
    }
    
    // Initialize tooltips if needed
    initializeTooltips();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenuToggle.setAttribute('aria-expanded', 
                mobileMenu.classList.contains('hidden') ? 'false' : 'true'
            );
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Emergency hotline click tracking
    const emergencyLinks = document.querySelectorAll('[data-emergency]');
    emergencyLinks.forEach(link => {
        link.addEventListener('click', trackEmergencyClick);
    });
}

// Initialize accessibility features
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded shadow-lg z-50';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add aria labels to decorative elements
    const decorativeElements = document.querySelectorAll('.animate-bounce, .animate-pulse');
    decorativeElements.forEach(el => {
        el.setAttribute('aria-hidden', 'true');
    });
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
}

// Language toggle functionality
let currentLang = 'en';
const translations = {
    en: {
        welcome: 'Welcome',
        services: 'Services',
        contact: 'Contact',
        emergency: 'Emergency'
    },
    zu: {
        welcome: 'Siyakwamukela',
        services: 'Izinsiza',
        contact: 'Thintana',
        emergency: 'Iphutha'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zu' : 'en';
    updatePageLanguage();
    localStorage.setItem('language', currentLang);
}

function updatePageLanguage() {
    // Update elements with translation data
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update lang attribute
    document.documentElement.lang = currentLang === 'zu' ? 'zu' : 'en';
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Validate form
    if (!validateForm(form)) {
        return false;
    }
    
    // Show loading state
    showFormLoading(form);
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
        showFormSuccess(form);
        form.reset();
    }, 1500);
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('form-error');
            isValid = false;
            showFieldError(field, 'This field is required');
        } else {
            field.classList.remove('form-error');
            hideFieldError(field);
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('form-error');
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        }
        
        // Phone validation (South African format)
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^(\+27|0)[0-9]{9}$/;
            if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                field.classList.add('form-error');
                isValid = false;
                showFieldError(field, 'Please enter a valid South African phone number');
            }
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Hide field error
function hideFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Show form loading state
function showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading mr-2"></span>Submitting...';
    }
}

// Show form success
function showFormSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit ✓';
        submitBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Submit';
            submitBtn.classList.remove('bg-green-500');
        }, 3000);
    }
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMessage.textContent = 'Form submitted successfully!';
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Track emergency clicks
function trackEmergencyClick() {
    // In a real implementation, this would send analytics data
    console.log('Emergency contact clicked');
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals/menus
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                openModal.classList.add('hidden');
            }
            
            const openMenu = document.getElementById('mobile-menu');
            if (openMenu && !openMenu.classList.contains('hidden')) {
                openMenu.classList.add('hidden');
            }
        }
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('focus', showTooltip);
        trigger.addEventListener('blur', hideTooltip);
    });
}

function showTooltip(e) {
    const trigger = e.target;
    const text = trigger.getAttribute('data-tooltip');
    
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bg-gray-800 text-white text-xs px-2 py-1 rounded z-50';
    tooltip.textContent = text;
    tooltip.id = 'tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = trigger.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize smooth scroll
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Utility function to format South African phone numbers
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return '0' + cleaned.slice(1, 4) + ' ' + cleaned.slice(4, 7) + ' ' + cleaned.slice(7);
    }
    return phone;
}

// Check if user is on mobile
function isMobile() {
    return window.innerWidth < 768;
}

// Debounce function for performance
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

// Throttle function for scroll events
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
    };
}

// POPIA compliance - Clear sensitive data
function clearSensitiveData() {
    // Clear any stored sensitive data when page is unloaded
    window.addEventListener('beforeunload', function() {
        // Clear any potentially sensitive data from memory
        const sensitiveInputs = document.querySelectorAll('input[type="email"], input[type="tel"], textarea');
        sensitiveInputs.forEach(input => {
            input.value = '';
        });
    });
}

// Initialize POPIA compliance
clearSensitiveData();