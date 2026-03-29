CREATE DATABASE product_db;

USE product_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
INSERT INTO products (name, price) VALUES
('Laptop', 50000),
('Phone', 20000),
('Headphones', 3000);
SELECT * FROM products;
UPDATE products
SET deleted_at = NOW()
WHERE id = 1;