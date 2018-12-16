var mysql = require("mysql");
var inquirer = require("inquirer");

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

function displayItems(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("hello");

        console.log(res);
    });
};