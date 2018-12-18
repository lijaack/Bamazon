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
  promptManager()
});

// ==========================================================================ask the manager what he wants to do ===========================================================================================

function promptManager(){
  inquirer.prompt([
      {
          type: "list",
          name: "doWhat",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "exit console"]
      }
  ]).then(function(response){
     
    switch(response.doWhat){
      case "View Products for Sale": displayItems();
      break;

      case "View Low Inventory": displayLow();
      break;

      case "Add to Inventory":addInventory();
      break;

      case "Add New Product":addNewProduct();
      break;

      case "exit console": connection.end();
      break;
    }
  });
}



//========================================================================== display items ===========================================================================================

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
        inquirer.prompt([
          {
              type: "confirm",
              name: "doAgain",
              message: "Here are the current products for sale, would you like to do something else?",
  
          }
        ]).then(function(response){
          if (response.doAgain){
            promptManager();
          } else {
            connection.end();
          };

        });

      });

};

//========================================================================== display low inventory===========================================================================================
function displayLow(){
  console.log("hello")

  //========================================== selects all from database and displays a table ==========================================
  connection.query("SELECT * FROM products WHERE stock_quantity < 20", function(err, res) {

    if (err) throw err;
    
    var table = new cliTable({

        head:["item id", "product name", "department name","price", "stock quantity"]

    })

    for(var i = 0; i < res.length; i++){
        
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        
    }    

    console.log(table.toString())  

//========================================== ask if the manager wants to do anything else ==========================================
    inquirer.prompt([
      {
          type: "confirm",
          name: "doAgain",
          message: "Here are the items with less than 20 quantity left, would you like to do something else?",

      }
    ]).then(function(response){
      if (response.doAgain){
        promptManager();
      } else {
        connection.end();
      };

    });

  });


}



//========================================================================== add inventory===========================================================================================

function addInventory(){

  var itemLength;
//selects all from database and displays a table
  connection.query("SELECT * FROM products", function(err, res) {

    if (err) throw err;
    itemLength = res.length;

    var table = new cliTable({

        head:["item id", "product name", "department name","price", "stock quantity"]

    })

    for(var i = 0; i < res.length; i++){
        
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        
    }    
    console.log(table.toString())  

// ==========================================ask the manager which item he wants to select and how many items he would like to add=====================

    inquirer.prompt([
      {
        type:"input",
        name:"itemNum",
        message:"Which item would you like to add inventory to?"
      },
      {
        type:"input",
        name:"updateQuantity",
        message:"How many would you like to add?"
      }
      ]).then(function(response){
        var itemNum = parseInt(response.itemNum);
        var updateQuantity = parseInt(response.updateQuantity);
        var itemName;
        var currentQuantity;
        var updateQuantity;
        
        if (itemNum <= itemLength && itemNum > 0){

// ========================================== confirms the manager chose the right item and added the right quantity ==========================================
            connection.query("SELECT * FROM products", function(err, res) {

                for (var i = 0; i < res.length; i++){

                    if(itemNum === res[i].item_id){
                        currentQuantity = res[i].stock_quantity;
                        itemName = res[i].product_name;
                    }
                }
                confirmUpdate()
            });

            function confirmUpdate(){
                if(updateQuantity > 0){

                    inquirer.prompt([
                        {
                            type: "confirm",
                            name:"confirmUpdate",
                            message: "You are adding " + updateQuantity + " inventory to " + itemName + ". Is this correct?"
                        }
                    ]).then(function(response){
                        if (response.confirmUpdate){
                            update();
                        } else{
                            promptManager();
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
                        updateQuantity = response.changeQuantity;
                        confirmUpdate();
                    });
                };
            };


// ========================================== if everything is confirmed, update the database ==========================================
            function update(){
                newInventory = currentQuantity + updateQuantity;

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newInventory
                        },
                        {
                            item_id: itemNum
                        }
                    ],
                    function(err, res) {

                        if (err) throw err;
                        
                        inquirer.prompt([
                          {
                              type: "confirm",
                              name: "doAgain",
                              message: "Your inventory has been successfully updated. Would you like to do something else?",
                    
                          }
                        ]).then(function(response){
                          if (response.doAgain){
                            promptManager();
                          } else {
                            connection.end();
                          };
                    
                        });
                });
            }

        } else {

            console.log("item not found, select a different item");
            addInventory();

        };



      });

    });

}

//========================================================================== add new product===========================================================================================
function addNewProduct(){




}
