var mysql = require("mysql");
var inquirer = require("inquirer");

var chosenID;
var chosenQuantity;
var remainingQuantity;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // Your password
    password: "2425",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected!");
    // run the start function after the connection is made to prompt the user
    start();
    
});

//function which uses inquirer to ask the user what they would like to buy
function ask() {
    
    inquirer
        .prompt([
            {
                name: "chooseItemID",
                type: "input",
                message: "What is the ID number of the product you would like to buy?",
            },
            {
                name: "chooseItemQuantity",
                type: "input",
                message: "How many would you like to buy?",
            }
        ]).then(function (answer) {
            chosenQuantity = answer.chooseItemQuantity;
            chosenID = answer.chooseItemID;
            checkInventory();
        });
        
}

function checkInventory() {
    connection.query("SELECT * FROM products WHERE item_id = " + chosenID, function (err, res) {
        if (err) throw err;
        // console.log("-----------------------------------");
        // console.log(res[0]);
        // console.log("-----------------------------------");

        //check to see if the product is out of stock
        if(res[0].stock_quantity === 0){
            console.log("-----------------------------------");
            console.log("Sorry, we are out of stock right now. Please choose a different product.")
            console.log("-----------------------------------");
            ask();
        }

        //check to see if there is partial inventory for the customer order
        else if (res[0].stock_quantity !== 0 && res[0].stock_quantity < chosenQuantity) {
            var total = res[0].stock_quantity * res[0].price;
            remainingQuantity = 0;
            console.log("-----------------------------------");
            console.log("We only have " + res[0].stock_quantity + " available right now.")
            console.log("You have successfully purchased " + res[0].stock_quantity + " " + res[0].product_name);
            console.log("Your total is $" + total);
            console.log("-----------------------------------");
            updateInventory();
        }

        //let order complete
        else {
            var total = chosenQuantity * res[0].price;
            remainingQuantity = res[0].stock_quantity - chosenQuantity;
            console.log("-----------------------------------");
            console.log("You have successfully purchased " + chosenQuantity + " " + res[0].product_name);
            console.log("Your total is $" + total);
            console.log("-----------------------------------");
            updateInventory();
        }
        
    });
    
}

// function which displays all the products from the table
function start() {
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ") " + res[i].product_name + " — $" + res[i].price)
        }
        console.log("-----------------------------------");
        ask();
    });
}

// updates the quantity in the database after the product is purchased
function updateInventory() {
    // console.log("Time to update the inventory!")
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: remainingQuantity
          },
          {
            item_id: chosenID
          }
        ],
        function(err, res) {
            if (err) throw err;
        }
      );
      ask();
      // logs the actual query being run
    //   console.log(query.sql);
}
