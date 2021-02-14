var mysql2 = require("mysql2");

var connection = mysql2.createConnection({
    multipleStatements:true,
    host:'localhost',
    user:'root',
    password:'5610',
    database:"school_assignment",
    port:3306,
    
});

connection.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected!");
    }
});

module.exports = connection;