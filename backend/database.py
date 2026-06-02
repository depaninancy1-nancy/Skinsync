# ============================================
# SKINSYNC - DATABASE CONFIGURATION
# ============================================

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime

db = SQLAlchemy()
migrate = Migrate()

# ============================================
# DATABASE MODELS
# ============================================

class User(db.Model):
    """User Model"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    skin_type = db.Column(db.String(50), nullable=True)  # oily, dry, combination, sensitive, normal
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    routines = db.relationship('Routine', backref='user', lazy=True, cascade='all, delete-orphan')
    products = db.relationship('Product', backref='user', lazy=True, cascade='all, delete-orphan')
    activities = db.relationship('Activity', backref='user', lazy=True, cascade='all, delete-orphan')
    photos = db.relationship('ProgressPhoto', backref='user', lazy=True, cascade='all, delete-orphan')


class Routine(db.Model):
    """Skincare Routine Model"""
    __tablename__ = 'routines'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    routine_type = db.Column(db.String(50), nullable=False)  # morning, evening, weekly, etc.
    frequency = db.Column(db.String(50), nullable=True)  # daily, alternate-day, weekly
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    steps = db.relationship('RoutineStep', backref='routine', lazy=True, cascade='all, delete-orphan')
    logs = db.relationship('RoutineLog', backref='routine', lazy=True, cascade='all, delete-orphan')


class RoutineStep(db.Model):
    """Routine Steps Model"""
    __tablename__ = 'routine_steps'
    
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    step_number = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Product(db.Model):
    """Skincare Product Model"""
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    brand = db.Column(db.String(120), nullable=True)
    product_type = db.Column(db.String(50), nullable=False)  # cleanser, moisturizer, etc.
    skin_type = db.Column(db.String(50), nullable=True)
    ingredients = db.Column(db.Text, nullable=True)
    purchase_date = db.Column(db.DateTime, nullable=True)
    expiry_date = db.Column(db.DateTime, nullable=True)
    quantity = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Float, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, nullable=True)  # 1-5 rating
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Activity(db.Model):
    """User Activity Log Model"""
    __tablename__ = 'activities'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)  # routine_completed, product_used, etc.
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class RoutineLog(db.Model):
    """Routine Log Model"""
    __tablename__ = 'routine_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    completion_date = db.Column(db.DateTime, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class SkinCondition(db.Model):
    """Skin Condition Log Model"""
    __tablename__ = 'skin_conditions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Skin condition scores (1-10)
    oiliness = db.Column(db.Integer, nullable=True)
    dryness = db.Column(db.Integer, nullable=True)
    acne = db.Column(db.Integer, nullable=True)
    sensitivity = db.Column(db.Integer, nullable=True)
    redness = db.Column(db.Integer, nullable=True)
    overall_score = db.Column(db.Integer, nullable=True)
    
    notes = db.Column(db.Text, nullable=True)
    weather = db.Column(db.String(50), nullable=True)
    stress_level = db.Column(db.String(50), nullable=True)  # low, medium, high
    sleep_hours = db.Column(db.Integer, nullable=True)
    water_intake = db.Column(db.String(50), nullable=True)  # low, medium, high
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class ProgressPhoto(db.Model):
    """Progress Photo Model"""
    __tablename__ = 'progress_photos'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    area = db.Column(db.String(50), nullable=True)  # face, forehead, cheeks, chin, etc.
    notes = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class AuditLog(db.Model):
    """Audit Log Model for tracking changes"""
    __tablename__ = 'audit_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    action = db.Column(db.String(255), nullable=False)
    table_name = db.Column(db.String(50), nullable=True)
    record_id = db.Column(db.Integer, nullable=True)
    details = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# ============================================
# DATABASE INITIALIZATION
# ============================================

def init_db(app):
    """Initialize database with Flask app"""
    db.init_app(app)
    migrate.init_app(app, db)
    
    with app.app_context():
        db.create_all()
        print('Database initialized successfully')


def reset_db(app):
    """Reset database (for testing)"""
    with app.app_context():
        db.drop_all()
        db.create_all()
        print('Database reset successfully')
