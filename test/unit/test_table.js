var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gayu1997",
  database: "mroomtest"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE rooms (id INT(10),roomname VARCHAR(255), roomname1 VARCHAR(255), status INT(2), sensor INT(2), calendar INT(2), updatedAt TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
