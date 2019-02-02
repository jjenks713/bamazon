var mysql = require("mysql");
require("console.table");
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
        console.table(res);
        // console.log("ID    | Product    | Department    | Price    | Stock");
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].id + "|"
        //         + res[i].product + "|"
        //         + res[i].department + "|"
        //         + res[i].price + "|"
        //         + res[i].quantity);
        // }
        runSearch();
    });
    console.log(query.sql);
    
};

function runSearch() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "which product would you like to buy? (choose by ID number)",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(" !!Please enter an ID NUMBER!!")
                return false;
            }
        },
        {
            name: "purchase",
            type: "input",
            message: "How many would you like",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(" !!Please enter a NUMBER!!")
                return false;
            }
        }
    ])
        .then(function (answer) {
            var query = "SELECT id FROM products";
            connection.query(query, {id: answer.value}, function(err, res){
                var input = answer.value;
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].input);
                }
                // console.log(res);
            })
        });
    // connection.end();
};

