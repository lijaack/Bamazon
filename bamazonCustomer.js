var mysql = require("mysql");
var inquirer = require("inquirer");
var cliTable = require("cli-table");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  displayItems();
});

var itemLength;

function displayItems(){

    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;
        
        var table = new cliTable({

            head:["item id", "product name", "department name","price", "stock quantity"]

        })

        for(var i = 0; i < res.length; i++){
            
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
            
        }    

        console.log(table.toString())  

        itemLength = res.length;

        promptCustomer();

    });

};

function promptCustomer(){

        inquirer.prompt([

            {
                type: 'input',
                name: 'item',
                message: 'Enter the item id of the item you would like to purchase'
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to purchase?'
            }

        ]).then(function(response){

            var itemNum = parseInt(response.item);
            var quantity = parseInt(response.quantity);
            var itemName;
            var currentQuantity;
            var itemCost;
            var total;
            var updateQuantity;
            
            if (itemNum <= itemLength && itemNum > 0){

                connection.query("SELECT * FROM products", function(err, res) {

                    for (var i = 0; i < res.length; i++){

                        if(itemNum === res[i].item_id){
                            currentQuantity = res[i].stock_quantity;
                            itemCost = res[i].price;
                            itemName = res[i].product_name;
                        }
                    }

                    confirmPurchase()
                });

                function confirmPurchase(){
                    if(quantity < currentQuantity && quantity > 0){

                        total = itemCost * quantity;

                        inquirer.prompt([
                            {
                                type: "confirm",
                                name:"confirmPurchase",
                                message: "You are purchasing " + quantity + " " + itemName + ". Your order total is " + total + ". Would you like to complete the purchase?"
                            }
                        ]).then(function(response){
                            if (response.confirmPurchase){
                                update();
                            } else{
                                promptCustomer();
                            };
                        });

                    } else {
                        
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "changeQuantity",
                                message: "You have entered an invalid quantity, please change your quantity."
                            }
                        ]).then(function(response){
                            quantity = response.changeQuantity;
                            confirmPurchase();
                        });
                    };
                };



                function update(){
                    updateQuantity = currentQuantity - quantity;

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: updateQuantity
                            },
                            {
                                item_id: itemNum
                            }
                        ],
                        function(err, res) {

                            if (err) throw err;
                            console.log("Your purchase is successful.")
                            shopAgain()
                    });
                }

            } else {

                console.log("item not found, select a different item");
                promptCustomer();

            };

        });

}

function shopAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "shopContinue",
            message: "would you like to continue shopping?"
        }
    ]).then(function(response){
        if (response.shopContinue){
            displayItems();
        } else{
            connection.end();
        }
    });
}