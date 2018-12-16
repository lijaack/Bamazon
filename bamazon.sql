DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES ("milk","dairy", 2.99, 50), ("eggs","produce", 3.99, 100), ("doritos","snacks", 1.99, 70), ("cheetos","snacks", 1.99, 70), ("chicken breast","meat", 9.99, 30), ("pork","meat", 8.99, 10), 
("beef","meat", 14.99, 30), ("candy","snacks", .99, 100), ("yogurt","dairy", 1.50, 40), ("orange juice","beverages", 2.99, 15)





