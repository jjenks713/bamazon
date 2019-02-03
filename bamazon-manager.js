// requires, mysql and inquirer
var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

// mysql connection; host, port, user, password, db
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
})

// connection. connect function link to managment functions
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("Welcome to Bamazon Manager")
    manageOptions();
    // viewProducts();
});

// inquirer prompt with switch linked to each function
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
            // switch through choices, add functions
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

// view products function, logging table from db
function viewProducts() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.table(res);
        // link to exit app function
        exitApp();
    });
};

// viewing low inventory, under 20 Function 
function viewInventory() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("\nThese are all the products that have inventory of 20 or less: \n")
        // loop through table to find products with quantity under 20
        for (var i = 0; i < res.length; i++) {
            var lowInv = res[i].quantity;
            var name = res[i].product;
            // if quantity under 20 display in console
            if (lowInv <= 20) {
                console.log(lowInv + " " + name + "\n");
            }
        }
        // link to exit app function
        exitApp();
    });
};

// function to add amount to inventory
function addToInventory() {
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        // list table as reference to add to quantity
        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.table(res);

        // prompt to add amount to inventory
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
            // get responses from prompt
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, [{ id: answer.add }, { amount: answer.amount }], function (err, res) {
                // new function for seperate query connection
                add();
                function add() {
                    // parseInt res so they add together
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
                        // log response on console
                        console.log("\nThe quantity of " + res[0].product + " has been updated to " + adding + "\n")
                    );
                    // link to exit app function
                    exitApp();
                };
            });
        });
    });
};

// add product function
function addProduct() {
    // prompt with questions for product, department, cost and amount
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
            name: "price",
            type: "input",
            message: "How much does it cost?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to add?"
        },
    ])
        .then(function(answers) {
            var queryStr = "INSERT INTO products SET ?";
            // insert responses into db
            connection.query(queryStr, answers, function(){
                
                console.log("New product " + answers.product + " has been inserted!\n");
                // console.log('New product has been added to the inventory under Item ID ' + + results.insertId + '.');
                // console.log("\n---------------------------------------------------------------------\n");      
                exitApp();  
                },
                
                
            // [
            //     // { product: answers.product }, 
            //     // { department: answers.department },
            //     // { cost: answers.price },
            //     // { quantity: answers.quantity }
            // ], 
            
                function (err, res) {
                if (err) throw err;
                // display responses on console
                // link to exit app function
            });
        });
};


// exit app function, restarts app or exits secion, prompt list
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