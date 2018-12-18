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


function promptManager(){
  inquirer.prompt([
      {
          type: "list",
          name: "doWhat",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
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

    }
  });
}


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

    });

};

function displayLow(){

}

function addInventory(){

}

function addNewProduct(){

}