-- ============================================
-- SKINSYNC - SAMPLE DATA FOR TESTING
-- ============================================

-- Insert sample users
INSERT INTO users (name, email, password_hash, skin_type, age, gender) VALUES
('John Doe', 'john@example.com', 'hashed_password_here', 'combination', 28, 'male'),
('Jane Smith', 'jane@example.com', 'hashed_password_here', 'oily', 25, 'female'),
('Mike Johnson', 'mike@example.com', 'hashed_password_here', 'dry', 35, 'male'),
('Sarah Williams', 'sarah@example.com', 'hashed_password_here', 'sensitive', 30, 'female');

-- Insert sample routines
INSERT INTO routines (user_id, name, description, routine_type, frequency) VALUES
(1, 'Morning Skincare', 'Daily morning routine', 'morning', 'daily'),
(1, 'Evening Skincare', 'Daily evening routine', 'evening', 'daily'),
(2, 'Weekly Deep Clean', 'Weekly exfoliation routine', 'weekly', 'weekly'),
(3, 'Moisturizing Routine', 'Extra moisturizing routine', 'evening', 'alternate-day');

-- Insert sample products
INSERT INTO products (user_id, name, brand, product_type, skin_type, rating) VALUES
(1, 'Gentle Cleanser', 'CeraVe', 'cleanser', 'combination', 4.5),
(1, 'Moisturizing Lotion', 'CeraVe', 'moisturizer', 'combination', 4.7),
(1, 'SPF 30 Sunscreen', 'Neutrogena', 'sunscreen', 'combination', 4.3),
(2, 'Oil Control Cleanser', 'Olay', 'cleanser', 'oily', 4.2),
(2, 'Lightweight Moisturizer', 'Olay', 'moisturizer', 'oily', 4.0),
(3, 'Rich Cream Cleanser', 'Cetaphil', 'cleanser', 'dry', 4.6),
(3, 'Deep Hydration Moisturizer', 'Cetaphil', 'moisturizer', 'dry', 4.8);

-- Insert sample routine steps
INSERT INTO routine_steps (routine_id, product_id, step_number, description, duration_minutes) VALUES
(1, 1, 1, 'Wash face with cleanser', 5),
(1, 2, 2, 'Apply moisturizer', 3),
(1, 3, 3, 'Apply sunscreen', 2),
(2, 1, 1, 'Wash face with cleanser', 5),
(2, 2, 2, 'Apply night moisturizer', 3);

-- Insert sample skin conditions
INSERT INTO skin_conditions (user_id, oiliness, dryness, acne, sensitivity, redness, overall_score, weather, stress_level, sleep_hours, water_intake) VALUES
(1, 6, 3, 4, 2, 3, 4, 'sunny', 'medium', 8, 'medium'),
(1, 5, 4, 3, 2, 2, 3, 'rainy', 'low', 9, 'high'),
(2, 8, 1, 5, 2, 4, 5, 'sunny', 'high', 7, 'low'),
(3, 2, 8, 2, 4, 5, 6, 'cold', 'medium', 8, 'medium');

-- Insert sample activities
INSERT INTO activities (user_id, activity_type, description, date) VALUES
(1, 'routine_completed', 'Morning routine completed successfully', NOW() - INTERVAL 1 DAY),
(1, 'routine_completed', 'Evening routine completed successfully', NOW()),
(2, 'product_used', 'Used oil control cleanser', NOW()),
(3, 'routine_completed', 'Evening moisturizing routine completed', NOW() - INTERVAL 2 DAY);

-- Insert sample routine logs
INSERT INTO routine_logs (routine_id, completed, completion_date, notes) VALUES
(1, TRUE, NOW() - INTERVAL 1 DAY, 'Routine went smoothly'),
(1, TRUE, NOW(), 'Skin felt fresh after routine'),
(2, TRUE, NOW() - INTERVAL 1 DAY, 'Used extra moisturizer today'),
(3, TRUE, NOW() - INTERVAL 3 DAY, 'Good deep cleaning session');
