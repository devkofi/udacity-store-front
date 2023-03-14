/* Replace with your SQL commands */
CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER REFERENCES orders(product_quantity) NOT NULL
);