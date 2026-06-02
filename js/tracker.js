// ============================================
// SKINSYNC - SKINCARE TRACKER MODULE
// ============================================

/**
 * Get all user routines
 */
async function getUserRoutines() {
    try {
        const response = await apiCall('/routines', 'GET');
        return response.routines || [];
    } catch (error) {
        logMessage(`Failed to fetch routines: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Create new skincare routine
 */
async function createRoutine(routineData) {
    try {
        const response = await apiCall('/routines', 'POST', routineData);
        showNotification('Routine created successfully!', 'success');
        return response.routine;
    } catch (error) {
        logMessage(`Failed to create routine: ${error.message}`, 'error');
        showNotification('Failed to create routine', 'error');
        throw error;
    }
}

/**
 * Update skincare routine
 */
async function updateRoutine(routineId, routineData) {
    try {
        const response = await apiCall(`/routines/${routineId}`, 'PUT', routineData);
        showNotification('Routine updated successfully!', 'success');
        return response.routine;
    } catch (error) {
        logMessage(`Failed to update routine: ${error.message}`, 'error');
        showNotification('Failed to update routine', 'error');
        throw error;
    }
}

/**
 * Delete skincare routine
 */
async function deleteRoutine(routineId) {
    try {
        await apiCall(`/routines/${routineId}`, 'DELETE');
        showNotification('Routine deleted successfully!', 'success');
        return true;
    } catch (error) {
        logMessage(`Failed to delete routine: ${error.message}`, 'error');
        showNotification('Failed to delete routine', 'error');
        throw error;
    }
}

/**
 * Get all user products
 */
async function getUserProducts() {
    try {
        const response = await apiCall('/products', 'GET');
        return response.products || [];
    } catch (error) {
        logMessage(`Failed to fetch products: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Add new product
 */
async function addProduct(productData) {
    try {
        const response = await apiCall('/products', 'POST', productData);
        showNotification('Product added successfully!', 'success');
        return response.product;
    } catch (error) {
        logMessage(`Failed to add product: ${error.message}`, 'error');
        showNotification('Failed to add product', 'error');
        throw error;
    }
}

/**
 * Update product
 */
async function updateProduct(productId, productData) {
    try {
        const response = await apiCall(`/products/${productId}`, 'PUT', productData);
        showNotification('Product updated successfully!', 'success');
        return response.product;
    } catch (error) {
        logMessage(`Failed to update product: ${error.message}`, 'error');
        showNotification('Failed to update product', 'error');
        throw error;
    }
}

/**
 * Delete product
 */
async function deleteProduct(productId) {
    try {
        await apiCall(`/products/${productId}`, 'DELETE');
        showNotification('Product deleted successfully!', 'success');
        return true;
    } catch (error) {
        logMessage(`Failed to delete product: ${error.message}`, 'error');
        showNotification('Failed to delete product', 'error');
        throw error;
    }
}

/**
 * Log skincare activity
 */
async function logActivity(activityData) {
    try {
        const response = await apiCall('/activities', 'POST', activityData);
        showNotification('Activity logged successfully!', 'success');
        return response.activity;
    } catch (error) {
        logMessage(`Failed to log activity: ${error.message}`, 'error');
        showNotification('Failed to log activity', 'error');
        throw error;
    }
}

/**
 * Get progress data
 */
async function getProgressData(startDate, endDate) {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        const response = await apiCall(`/progress?${params}`, 'GET');
        return response.data || [];
    } catch (error) {
        logMessage(`Failed to fetch progress data: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Upload progress photo
 */
async function uploadProgressPhoto(formData) {
    try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE_URL}/progress/photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        showNotification('Photo uploaded successfully!', 'success');
        return data.photo;
    } catch (error) {
        logMessage(`Failed to upload photo: ${error.message}`, 'error');
        showNotification('Failed to upload photo', 'error');
        throw error;
    }
}

/**
 * Get skin condition analysis
 */
async function getSkinAnalysis() {
    try {
        const response = await apiCall('/analysis/skin-condition', 'GET');
        return response.analysis || {};
    } catch (error) {
        logMessage(`Failed to get skin analysis: ${error.message}`, 'error');
        return {};
    }
}

/**
 * Get recommendations
 */
async function getRecommendations() {
    try {
        const response = await apiCall('/recommendations', 'GET');
        return response.recommendations || [];
    } catch (error) {
        logMessage(`Failed to fetch recommendations: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Generate skincare report
 */
async function generateReport(reportType = 'monthly') {
    try {
        const response = await apiCall(`/reports/generate?type=${reportType}`, 'POST');
        return response.report || {};
    } catch (error) {
        logMessage(`Failed to generate report: ${error.message}`, 'error');
        showNotification('Failed to generate report', 'error');
        throw error;
    }
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Calculate skin improvement percentage
 */
function calculateImprovement(startScore, currentScore) {
    if (startScore === 0) return 0;
    const improvement = ((currentScore - startScore) / startScore) * 100;
    return Math.round(improvement * 10) / 10;
}
