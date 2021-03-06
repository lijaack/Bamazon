DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    product_sales DECIMAL(65,2),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs  INT(100) NOT NULL,
    PRIMARY KEY (department_id)

);



INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES ("milk","grocery", 2.99, 50), ("eggs","grocery", 3.99, 100), ("doritos","snacks", 1.99, 70), ("cheetos","snacks", 1.99, 70), ("chicken breast","grocery", 9.99, 30), ("pork","grocery", 8.99, 10), 
("beef","grocery", 14.99, 30), ("candy","snacks", .99, 100), ("yogurt","dairy", 1.50, 40), ("orange juice","beverages", 2.99, 15), ("macbook","electronics", 1499.99, 50), ("ps4","electronics", 299.99, 50), 
("xbox one","electronics", 299.99, 50);



INSERT INTO departments(department_name, over_head_costs)

VALUES ("grocery", 20000), ("snacks", 10000), ("dairy", 10000), ("beverages", 10000), ("electronics", 100000);