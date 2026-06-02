// ============================================
// SKINSYNC - MAIN APPLICATION SCRIPT
// ============================================

// Global Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const APP_NAME = 'SkinSync';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Log messages to console with prefix
 */
function logMessage(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${APP_NAME} ${type.toUpperCase()}] ${timestamp}: ${message}`);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    const notificationElement = document.createElement('div');
    notificationElement.className = `notification notification-${type}`;
    notificationElement.textContent = message;
    notificationElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notificationElement);

    setTimeout(() => {
        notificationElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificationElement.remove(), 300);
    }, 3000);
}

/**
 * Display loading spinner
 */
function showLoadingSpinner(element) {
    element.innerHTML = '<div class="spinner"></div>';
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate password strength
 */
function validatePassword(password) {
    return password.length >= 8;
}

/**
 * Make API request with error handling
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add request body if provided
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        logMessage(`API Call Failed: ${error.message}`, 'error');
        throw error;
    }
}

// ============================================
// NAVIGATION & MENU
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

/**
 * Scroll to specific section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

function scrollToFeatures() {
    scrollToSection('features');
}

// ============================================
// MODAL MANAGEMENT
// ============================================

/**
 * Show login modal
 */
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * Close login modal
 */
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Switch between login and signup tabs
 */
function switchTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabButtons = document.querySelectorAll('.tab-button');

    if (tabName === 'login') {
        loginForm?.classList.add('active');
        loginForm?.classList.remove('hidden');
        signupForm?.classList.remove('active');
        signupForm?.classList.add('hidden');
        tabButtons[0]?.classList.add('active');
        tabButtons[1]?.classList.remove('active');
    } else if (tabName === 'signup') {
        signupForm?.classList.add('active');
        signupForm?.classList.remove('hidden');
        loginForm?.classList.remove('active');
        loginForm?.classList.add('hidden');
        tabButtons[1]?.classList.add('active');
        tabButtons[0]?.classList.remove('active');
    }
}

/**
 * Close modal when clicking outside
 */
function closeModalOnOutsideClick(event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target === modal) {
        closeLoginModal();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });

    // Modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }

    // Modal outside click
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', closeModalOnOutsideClick);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupForm);
    }
}

// ============================================
// FORM HANDLERS
// ============================================

/**
 * Handle contact form submission
 */
async function handleContactForm(e) {
    e.preventDefault();
    logMessage('Contact form submitted', 'info');

    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    try {
        showLoadingSpinner(form);

        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
        logMessage('Contact message sent successfully', 'info');
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
        logMessage(`Contact form error: ${error.message}`, 'error');
    } finally {
        form.innerHTML = '<input type="text" placeholder="Your Name" required><input type="email" placeholder="Your Email" required><textarea placeholder="Your Message" rows="5" required></textarea><button type="submit" class="btn btn-primary">Send Message</button>';
    }
}

/**
 * Handle login form submission
 */
async function handleLoginForm(e) {
    e.preventDefault();
    logMessage('Login form submitted', 'info');

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    try {
        const response = await apiCall('/auth/login', 'POST', { email, password });

        // Store auth token
        if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            showNotification('Login successful!', 'success');
            logMessage('User logged in successfully', 'info');

            // Redirect to dashboard (when available)
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showNotification('Login failed. Please check your credentials.', 'error');
        logMessage(`Login error: ${error.message}`, 'error');
    }
}

/**
 * Handle signup form submission
 */
async function handleSignupForm(e) {
    e.preventDefault();
    logMessage('Signup form submitted', 'info');

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const skinType = document.getElementById('skinType').value;

    // Validation
    if (!name || !email || !password || !confirm || !skinType) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }

    if (password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    try {
        const response = await apiCall('/auth/register', 'POST', {
            name,
            email,
            password,
            skin_type: skinType
        });

        // Store auth token
        if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            showNotification('Account created successfully!', 'success');
            logMessage('User registered successfully', 'info');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showNotification('Registration failed. Please try again.', 'error');
        logMessage(`Signup error: ${error.message}`, 'error');
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize application
 */
function initializeApp() {
    logMessage('Initializing application...', 'info');
    initializeEventListeners();
    logMessage('Application initialized successfully', 'info');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
