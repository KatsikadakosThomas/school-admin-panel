var mysql2 = require("mysql2");

var connection = mysql2.createConnection({
  multipleStatements: true,
  host: "remotemysql.com",
  user: "DZ8ixr8U9k",
  password: "qVvu2Wj0FA",
  database: "DZ8ixr8U9k",
  port: 3306,
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected!");
  }
});

module.exports = connection;
