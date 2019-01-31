var mysql = require("mysql");
var inquirer = require("inquirer");

connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    var query = connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.log("ID    | Product    | Department    | Price    | Stock");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "|"
                + res[i].product + "|"
                + res[i].department + "|"
                + res[i].price + "|"
                + res[i].quantity);
        }
    });
    console.log(query.sql);
    runSearch();
};

function runSearch() {
    inquirer.prompt([
        {
            name: "action",
            type: "input",
            message: "which product would you like to buy? (choose by ID number)",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "end",
            type: "input",
            message: "Enter ending position: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var query = "SELECT id FROM products";
            connection.query(query, [answer.])
        });
    connection.end();
};

