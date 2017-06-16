var express = require('express');
var url = require('url');
cors = require('cors');
var multer  =   require('multer');
var mime    =   require('mime');
var mysql = require('mysql');
var http=require('http');    
var app = express();
var bodyParser =    require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gayu1997',
  database : 'mroom'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

var server = http.createServer(function(req, res) {
req = url.parse(req.url, true)
  res.writeHead(200, {"Content-Type": "application/json"});
    var sql = "Select * from rooms";
    connection.query(sql, function (err, result) {
    if (err) throw err;
//json = '{"attribute":"value","array":["element", "1"]}'
//res.header('Content-type','application/json');
//res.header('Charset','utf8');
//console.log(result);
res.end(req.query.callback + "('" + JSON.stringify(result) + "')");
//res.jsonp(obj);
});
});

server.listen(4000);
console.log("Server is listening");
//app.listen(4000);
