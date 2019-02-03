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
        runSearch();
    });
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
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, [{ id: answer.item }, { amount: answer.purchase }], function (err, res) {
                if (err) throw err;
                if (answer.purchase > res[0].quantity) {
                    console.log("\nSorry there is not enough in stock. We only have " + res[0].quantity + ". Please choose another amount\n")
                    runSearch();
                } else {
                    console.log("\n" + answer.purchase + " " + res[0].product + " have been added to your cart" +
                        "\n\nYour total is $" + res[0].price * answer.purchase + "\n");


                    console.log("-------------------------------------------\n");

                    updateProduct();
                    function updateProduct() {
                        connection.query(
                            "UPDATE products SET ? where ?",
                            [
                                {
                                    quantity: res[0].quantity - answer.purchase
                                },
                                {
                                    id: answer.item
                                }
                            ],
                        );
                        exitApp();
                    };
                };
            })
        });

};

function exitApp(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Buy something else",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Buy something else":
        displayProducts();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
};

