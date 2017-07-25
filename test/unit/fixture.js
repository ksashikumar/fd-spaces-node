var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gayu1997"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT into mroomtest.rooms select * from mroom.rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});
console.log("Table populated");
process.exit();
