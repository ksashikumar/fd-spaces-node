var express    = require("express");
var mysql      = require('mysql');
var app = express();
 require('dotenv').config();
var connectionInfo = {
  host     : process.env.DB_HOST,  // mysql server hostname 
  user     : process.env.DB_USER,       // mysql database user name
  password : process.env.DB_PASS,       // mysql database password
  database : 'meeting'  // mysql database name
}
 
var connection = mysql.createConnection(connectionInfo);
 
// Test Case #1 : To test mysql connectivity
exports.testMySqlConnectivity = function(test){
     connection.connect(function(err){
         if(err) {
            test.ok(false, "Error to connect database.");
          } else {
            test.ok(true, "Database connected successfully.");
          }
          test.done();
     }); 
};
 
 
// Test Case #2 : To check expected value against actual value.
exports.testRowsCount = function(test){
     var query = 'SELECT * FROM rooms';
        connection.query(query, function(err, rows, fields) {
            var expectedRows = 87;
            var actualRows = rows.length;
            connection.end();
             if(err) {
                test.ok(false, "Error to execute query.");
             } else {
                test.equal(
                    actualRows, 
                    expectedRows, 
                    "Actual result is: "+actualRows +", Expected result is: "+expectedRows
                );
 
             }
             test.done();
 
     }); 
 
};
