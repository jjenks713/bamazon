
USE bamazon_db;

CREATE Table departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(90),
    overhead_costs DECIMAL(10,2)
)