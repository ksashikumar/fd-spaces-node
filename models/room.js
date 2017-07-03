/*var Sequelize = require('sequelize');
 
//Setting up the config
var sequelize = new Sequelize('mroom', 'root', 'gayu1997', {
    host: 'localhost',
    dialect: 'mysql'
});*/
"use strict";
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define("Room", {
		roomname   : DataTypes.STRING,
		roomname1  : DataTypes.STRING, 
		status      : DataTypes.INTEGER,
		sensor     : DataTypes.INTEGER, 
		calendar      : DataTypes.INTEGER 
	}, {
    classMethods:    {
            encontrar : function(res){ return sequelize
                                    .query('SELECT id,roomname,roomname1,sensor,calendar FROM rooms', { raw: true }) }   
      }
  });

  return Room;
};
