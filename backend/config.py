# ============================================
# SKINSYNC - CONFIGURATION
# ============================================

import os
from datetime import timedelta

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

class Config:
    """Base configuration"""
    
    # App Settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', False)
    TESTING = False
    
    # Database Configuration
    # MySQL
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+pymysql://root:password@localhost:3306/skinsync'
    )
    
    # Or Oracle (uncomment to use Oracle)
    # SQLALCHEMY_DATABASE_URI = os.getenv(
    #     'DATABASE_URL',
    #     'oracle://username:password@localhost:1521/skinsync'
    # )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'echo': False,
        'pool_size': 10,
        'pool_recycle': 3600,
        'pool_pre_ping': True,
    }
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=90)
    
    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5000').split(',')
    
    # File Upload Configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'uploads'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
    
    # Email Configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT', 587)
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', True)
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    
    # API Configuration
    API_VERSION = 'v1'
    API_TITLE = 'SkinSync API'
    API_DESCRIPTION = 'Skincare Tracking Application API'


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    # Ensure SECRET_KEY is set in production
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError('SECRET_KEY environment variable must be set in production')


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Get configuration based on environment"""
    env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])
