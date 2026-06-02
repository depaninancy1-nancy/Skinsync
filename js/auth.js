// ============================================
// SKINSYNC - AUTHENTICATION MODULE
// ============================================

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return localStorage.getItem('auth_token') !== null;
}

/**
 * Get current authenticated user
 */
function getCurrentUser() {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}

/**
 * Check authentication on page load
 */
function checkAuthentication() {
    const isOnProtectedPage = !window.location.pathname.includes('index.html') && 
                             window.location.pathname !== '/';
    
    if (isOnProtectedPage && !isAuthenticated()) {
        window.location.href = '/index.html';
    }
}

/**
 * Refresh authentication token
 */
async function refreshAuthToken() {
    try {
        const response = await apiCall('/auth/refresh', 'POST');
        if (response.token) {
            localStorage.setItem('auth_token', response.token);
            return true;
        }
    } catch (error) {
        logMessage(`Token refresh failed: ${error.message}`, 'error');
        logout();
        return false;
    }
}

/**
 * Verify authentication token validity
 */
async function verifyToken() {
    try {
        const response = await apiCall('/auth/verify', 'POST');
        return response.valid === true;
    } catch (error) {
        logMessage(`Token verification failed: ${error.message}`, 'error');
        return false;
    }
}

/**
 * Update user profile
 */
async function updateUserProfile(profileData) {
    try {
        const response = await apiCall('/auth/profile', 'PUT', profileData);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            return response.user;
        }
    } catch (error) {
        logMessage(`Profile update failed: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Change user password
 */
async function changePassword(oldPassword, newPassword) {
    try {
        const response = await apiCall('/auth/change-password', 'POST', {
            old_password: oldPassword,
            new_password: newPassword
        });
        return response.success === true;
    } catch (error) {
        logMessage(`Password change failed: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Request password reset
 */
async function requestPasswordReset(email) {
    try {
        const response = await apiCall('/auth/reset-password-request', 'POST', { email });
        return response.success === true;
    } catch (error) {
        logMessage(`Password reset request failed: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Reset password with token
 */
async function resetPassword(token, newPassword) {
    try {
        const response = await apiCall('/auth/reset-password', 'POST', {
            token,
            new_password: newPassword
        });
        return response.success === true;
    } catch (error) {
        logMessage(`Password reset failed: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Initialize authentication on page load
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuthentication);
} else {
    checkAuthentication();
}
