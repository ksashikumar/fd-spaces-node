var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "testdb",
  port :"3307"
});

con.connect(function(err) {
	console.log("in fn");
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT into testdb.rooms select * from meeting.rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});

