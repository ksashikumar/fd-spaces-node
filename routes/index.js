var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	var attrib = ['roomname'];
  /*models.Room.findAll({attributes : attrib}).then(function(res) {
    console.log("success");
	console.log(res);
  });*/
/*var a;
models.Room.encontrar().then(function(data){
		a=JSON.stringify(data);
		//console.log(a);
	});
	res.end(req.query.callback + "('" + a + "')");
});*/

var a=models.Room.encontrar(res);
a.then(function(data){
		//console.log(data);
		res.end(req.query.callback + "('" + JSON.stringify(data[0]) + "')");	
	});
});

module.exports = router;
