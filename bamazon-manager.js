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
    console.log("Welcome to Bamazon Manager")
    manageOptions();
    // viewProducts();
});

function manageOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.table(res);
        exitApp();
    });
};

function viewInventory() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("\nThese are all the products that have inventory of 20 or less: \n")
        for (var i = 0; i < res.length; i++) {
            var lowInv = res[i].quantity;
            var name = res[i].product;
            if (lowInv <= 20) {
                console.log(lowInv + " " + name + "\n");
            }
        }
        exitApp();
    });
};

function addToInventory() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {

        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.table(res);


        inquirer.prompt([
            {
                name: "add",
                type: "input",
                message: "Which product would you like to update (use ID number)?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log(" !!Please enter an ID NUMBER!!")
                    return false;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How much would you like to add",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log(" !!Please enter a NUMBER!!")
                    return false;
                }
            }
        ]).then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, [{ id: answer.add }, { amount: answer.amount }], function (err, res) {
                add();
                function add() {
                    var q = parseInt(res[0].quantity);
                    var a = parseInt(answer.amount);
                    var adding = q + a;
                    connection.query(
                        "UPDATE products SET ? where ?",
                        [
                            {
                                quantity: adding
                            },
                            {
                                id: answer.add
                            }
                        ],
                        console.log("\nThe quantity of " + res[0].product + " has been updated to " + adding + "\n")
                    );
                    exitApp();
                };
            });
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What product would you like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department is it in?"
        },
        {
            name: "cost",
            type: "input",
            message: "How much does it cost?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to add?"
        },
    ])
        .then(function(answers) {
            connection.connect("INSERT INTO products SET ?", 
            [
                { product: answers.product }, 
                { department: answers.department },
                { cost: answers.cost },
                { quantity: answers.amount }
            ], 
                function (err, res) {
                if (err) throw err;
                    console.log("New product " + answer.product + " has been inserted!\n");
                exitApp();
            });

        });
};

function exitApp() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Back to Menu",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Back to Menu":
                    manageOptions();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
};