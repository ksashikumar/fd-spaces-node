var express = require('express');
var multer  =   require('multer');
var mime    =   require('mime');
var mysql = require('mysql');
var app = express();
var bodyParser =    require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'meeting'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

//To receive data from postman request
app.post("/postFormAngular", function (req, res) {
        console.log("ROOM NAME IS  "+req.body.roomname);
		console.log("SENSOR STATUS IS  "+req.body.sensor);
		var value1=req.body.roomname;
		var value2=req.body.sensor;

		 response = {
      name:req.body.roomname,
      email:req.body.sensor
   };
	
var sql = "UPDATE rooms SET sensor = ? where roomname = ?";
  connection.query(sql,[value2, value1], function (err, result) {
    if (err) throw err;
    //console.log(result);
  });
});
app.listen(5000);