var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "testdb",
  port :"3307"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});