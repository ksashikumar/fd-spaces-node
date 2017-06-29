var sqlFixtures = require('sql-fixtures');
 
// depending on which database engine you are using 
// this is a typical PostgreSQL config for the pg driver 
var dbConfig = {
	client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: 'meeting',
  }
};
 
var dataSpec = {
  users: {
    username: 'Bob',
    email: 'bob@example.com'
  }
};
 
sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
  // at this point a row has been added to the users table 
  console.log(result.users[0].username);
});