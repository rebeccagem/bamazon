DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE IF NOT EXISTS products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (10,2),
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("m&ms","candy",1.50,30);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("bananas","fruit",2.75,60);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("ice cream","frozen foods",4.75,12);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("wine","alcohol",18.50,10);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("milk","dairy",3.20,50);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("skittles","candy",1.25,35);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("apples","fruit",1.05,80);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("popscicles","frozen foods",3.50,42);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("beer","alcohol",7.75,15);

INSERT into products ( product_name, department_name, price, stock_quantity)
value("gouda","dairy",4.35,8);

SELECT * FROM products;