var express    = require("express");
var mysql      = require('mysql');
var app = express();
 require('dotenv').config();
var connectionInfo = {
  host     : "localhost",  // mysql server hostname 
  user     : "ubuntu",       // mysql database user name
  password : "ubuntu",       // mysql database password
  database : 'circle_test'  // mysql database name
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
            //connection.end();
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

exports.updaterooms = function(test){
     var query = 'SELECT * FROM rooms where roomname="napierbridge"';
        connection.query(query, function(err, rows, fields) {
            var expectedRows = 1;
            var actualRows = rows[0].calendar;
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
 
