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
                                    .query('SELECT id,roomname,roomname1,sensor,calendar FROM rooms', { raw: true }) },
		postdata: function(req,res){ 
					var v1=req.body.roomname;
					var v2=req.body.sensor;
					var v3="'"+v1+"'";
					console.log(v3);
					return sequelize
                                    .query('UPDATE rooms SET sensor = '+ v2 +' where roomname = ' + v3, { raw: true }) }   
      }
  });

  return Room;
};
