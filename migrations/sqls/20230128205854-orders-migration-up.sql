/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    product_quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    order_status VARCHAR(10) NOT NULL
);