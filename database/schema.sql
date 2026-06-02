-- ============================================
-- SKINSYNC - DATABASE SCHEMA
-- ============================================
-- This schema works with MySQL and Oracle SQL
-- Compatible with both databases

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    skin_type VARCHAR(50),
    age INT,
    gender VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ROUTINES TABLE
-- ============================================
CREATE TABLE routines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    routine_type VARCHAR(50) NOT NULL,
    frequency VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    brand VARCHAR(120),
    product_type VARCHAR(50) NOT NULL,
    skin_type VARCHAR(50),
    ingredients TEXT,
    purchase_date DATETIME,
    expiry_date DATETIME,
    quantity VARCHAR(50),
    price DECIMAL(10, 2),
    notes TEXT,
    rating DECIMAL(3, 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ROUTINE STEPS TABLE
-- ============================================
CREATE TABLE routine_steps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    routine_id INT NOT NULL,
    product_id INT,
    step_number INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_routine_id (routine_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ACTIVITIES TABLE
-- ============================================
CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_date (date),
    INDEX idx_activity_type (activity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ROUTINE LOGS TABLE
-- ============================================
CREATE TABLE routine_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    routine_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completion_date DATETIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    INDEX idx_routine_id (routine_id),
    INDEX idx_completed (completed),
    INDEX idx_completion_date (completion_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SKIN CONDITIONS TABLE
-- ============================================
CREATE TABLE skin_conditions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    oiliness INT,
    dryness INT,
    acne INT,
    sensitivity INT,
    redness INT,
    overall_score INT,
    notes TEXT,
    weather VARCHAR(50),
    stress_level VARCHAR(50),
    sleep_hours INT,
    water_intake VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_date (date),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PROGRESS PHOTOS TABLE
-- ============================================
CREATE TABLE progress_photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    area VARCHAR(50),
    notes TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_date (date),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- AUDIT LOGS TABLE
-- ============================================
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_action (action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_routines_user_type ON routines(user_id, routine_type);
CREATE INDEX idx_products_user_type ON products(user_id, product_type);
CREATE INDEX idx_skin_conditions_user_date ON skin_conditions(user_id, date);
CREATE INDEX idx_activities_user_type ON activities(user_id, activity_type);

-- ============================================
-- END OF SCHEMA
-- ============================================
