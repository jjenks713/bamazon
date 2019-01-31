DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product VARCHAR(90) NULL,
department VARCHAR(45) NULL,
price DECIMAL(10,4) NULL,
quantity INT NULL,
PRIMARY KEY (id)
);