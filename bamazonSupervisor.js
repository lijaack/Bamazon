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
  promptSupervisor()
});

function promptSupervisor(){
  inquirer.prompt([
    {
        type: "list",
        name: "doWhat",
        message: "What would you like to do?",
        choices: ["View Products Sales by Department", "Create New Department", "exit console"]
    }
  ]).then(function(response){
    
    switch(response.doWhat){
      case "View Products Sales by Department": viewSales();
      break;

      case "Create New Department": createNew();
      break;

      case "exit console": connection.end();
      break;
    }
  });
}

function viewSales(){
  
};

function createNew(){

};