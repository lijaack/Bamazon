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

  connection.query("SELECT departments.department_id, departments.department_name, products.product_sales, departments.over_head_costs, COALESCE(sum(products.product_sales),0) AS total_sales, COALESCE(sum(products.product_sales),0) - departments.over_head_costs FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_name", function(err, res) {
    var table = new cliTable({
        head:["department id", "department name", "overhead cost", "product sales", "total profit"]
    });
    for(var i = 0; i < res.length; i++){
            
      table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, res[i].total_sales - res[i].over_head_costs])
      
    }    
    console.log(table.toString())  
    inquirer.prompt([
      {
          type: "confirm",
          name: "doAgain",
          message: "Here are the products sales by department, would you like to do something else?",

      }
    ]).then(function(response){
      if (response.doAgain){
        promptSupervisor();
      } else {
        connection.end();
      };

    });
  });


};

function createNew(){
  inquirer.prompt([
    {
      type:"input",
      name:"departmentName",
      message:"What department would you like to add?"
    },
    {
      type:"input",
      name:"overheadCost",
      message:"What is the over head cost for this department?"
    }
    ]).then(function(response){
        var departmentName = response.departmentName;
        var overheadCost = response.overheadCost;
  

        connection.query(
            "INSERT INTO departments (department_name, over_head_costs) VALUES ('" + departmentName + "', " + overheadCost + ")",              
            function(err, res) {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: "confirm",
                        name: "doAgain",
                        message: "The department has been successfully added. Would you like to do something else?",
              
                    }
                ]).then(function(response){
                    if (response.doAgain){
                    promptSupervisor();
                    } else {
                    connection.end();
                    };
            
                });
        });
    });
};