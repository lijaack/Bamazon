DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    product_sales INT(100) NOT NULL
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs  INT(100) NOT NULL,

);



INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES ("milk","grocery", 2.99, 50), ("eggs","grocery", 3.99, 100), ("doritos","snacks", 1.99, 70), ("cheetos","snacks", 1.99, 70), ("chicken breast","grocery", 9.99, 30), ("pork","grocery", 8.99, 10), 
("beef","grocery", 14.99, 30), ("candy","snacks", .99, 100), ("yogurt","dairy", 1.50, 40), ("orange juice","beverages", 2.99, 15), ("macbook","eletronics", 1499.99, 50), ("ps4","eletronics", 299.99, 50), 
("xbox one","eletronics", 299.99, 50)



