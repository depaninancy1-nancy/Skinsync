# ============================================
# SKINSYNC - MAIN APPLICATION FILE
# ============================================

from flask import Flask, jsonify, request
from flask_cors import CORS
from config import get_config
from database import init_db, db
from werkzeug.exceptions import HTTPException
import os

# Create Flask application
app = Flask(__name__)

# Load configuration
config = get_config()
app.config.from_object(config)

# Initialize extensions
CORS(app, resources={r"/api/*": {"origins": config.CORS_ORIGINS}})
init_db(app)

# ============================================
# ERROR HANDLERS
# ============================================

@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors"""
    return jsonify({
        'status': 'error',
        'message': 'Resource not found',
        'error': 'NOT_FOUND'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    db.session.rollback()
    return jsonify({
        'status': 'error',
        'message': 'Internal server error',
        'error': 'INTERNAL_SERVER_ERROR'
    }), 500


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Handle HTTP exceptions"""
    return jsonify({
        'status': 'error',
        'message': e.description,
        'error': e.code
    }), e.code


# ============================================
# BASIC ROUTES
# ============================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'SkinSync API is running',
        'version': '1.0.0'
    }), 200


@app.route('/api', methods=['GET'])
def api_info():
    """API information endpoint"""
    return jsonify({
        'name': 'SkinSync API',
        'version': '1.0.0',
        'description': 'Skincare Tracking Application API',
        'endpoints': {
            'health': '/api/health',
            'auth': '/api/auth/*',
            'routines': '/api/routines',
            'products': '/api/products',
            'progress': '/api/progress'
        }
    }), 200


# ============================================
# AUTHENTICATION ROUTES (Placeholder)
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration endpoint"""
    data = request.get_json()
    
    # TODO: Implement user registration
    # - Validate input
    # - Hash password
    # - Create user in database
    # - Generate JWT token
    
    return jsonify({
        'status': 'success',
        'message': 'User registered successfully',
        'token': 'placeholder_token',
        'user': {
            'id': 1,
            'name': data.get('name'),
            'email': data.get('email'),
            'skin_type': data.get('skin_type')
        }
    }), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    data = request.get_json()
    
    # TODO: Implement user login
    # - Validate credentials
    # - Verify password
    # - Generate JWT token
    
    return jsonify({
        'status': 'success',
        'message': 'Login successful',
        'token': 'placeholder_token',
        'user': {
            'id': 1,
            'name': 'John Doe',
            'email': data.get('email')
        }
    }), 200


# ============================================
# ROUTINE ROUTES (Placeholder)
# ============================================

@app.route('/api/routines', methods=['GET'])
def get_routines():
    """Get all user routines"""
    # TODO: Implement get routines
    return jsonify({
        'status': 'success',
        'routines': []
    }), 200


@app.route('/api/routines', methods=['POST'])
def create_routine():
    """Create new routine"""
    data = request.get_json()
    # TODO: Implement create routine
    return jsonify({
        'status': 'success',
        'message': 'Routine created',
        'routine': data
    }), 201


# ============================================
# PRODUCT ROUTES (Placeholder)
# ============================================

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all user products"""
    # TODO: Implement get products
    return jsonify({
        'status': 'success',
        'products': []
    }), 200


@app.route('/api/products', methods=['POST'])
def add_product():
    """Add new product"""
    data = request.get_json()
    # TODO: Implement add product
    return jsonify({
        'status': 'success',
        'message': 'Product added',
        'product': data
    }), 201


# ============================================
# PROGRESS ROUTES (Placeholder)
# ============================================

@app.route('/api/progress', methods=['GET'])
def get_progress():
    """Get progress data"""
    # TODO: Implement get progress
    return jsonify({
        'status': 'success',
        'data': []
    }), 200


# ============================================
# APPLICATION STARTUP
# ============================================

if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Run application
    debug_mode = app.config.get('DEBUG', False)
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=debug_mode,
        use_reloader=debug_mode
    )
