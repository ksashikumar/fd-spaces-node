var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gayu1997",
  database: "mroomtest"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});
