-- Clear existing data
DELETE FROM currency_denominations;

-- Insert USD denominations
INSERT INTO currency_denominations (currency, value, name) VALUES
('USD', 100.00, '100 Dollar Bill'),
('USD', 50.00, '50 Dollar Bill'),
('USD', 20.00, '20 Dollar Bill'),
('USD', 10.00, '10 Dollar Bill'),
('USD', 5.00, '5 Dollar Bill'),
('USD', 1.00, '1 Dollar Bill'),
('USD', 0.25, 'Quarter'),
('USD', 0.10, 'Dime'),
('USD', 0.05, 'Nickel'),
('USD', 0.01, 'Penny');

-- Insert EUR denominations
INSERT INTO currency_denominations (currency, value, name) VALUES
('EUR', 500.00, '500 Euro Note'),
('EUR', 200.00, '200 Euro Note'),
('EUR', 100.00, '100 Euro Note'),
('EUR', 50.00, '50 Euro Note'),
('EUR', 20.00, '20 Euro Note'),
('EUR', 10.00, '10 Euro Note'),
('EUR', 5.00, '5 Euro Note'),
('EUR', 2.00, '2 Euro Coin'),
('EUR', 1.00, '1 Euro Coin'),
('EUR', 0.50, '50 Cent Coin'),
('EUR', 0.20, '20 Cent Coin'),
('EUR', 0.10, '10 Cent Coin'),
('EUR', 0.05, '5 Cent Coin'),
('EUR', 0.02, '2 Cent Coin'),
('EUR', 0.01, '1 Cent Coin');