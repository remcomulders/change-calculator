CREATE TABLE IF NOT EXISTS currency_denominations (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(3) NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    name VARCHAR(50) NOT NULL
);