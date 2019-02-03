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
      .then(function(answer) {
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
    console.log("testing");
    connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
        if (err) throw err;
        console.log("***************");
        console.log("ITEMS FOR SALE!");
        console.log("***************");
        console.table(res);
        exitApp();
    });
}











function exitApp(){
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
    .then(function(answer) {
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