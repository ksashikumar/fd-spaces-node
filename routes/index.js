var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {

var a=models.Room.encontrar(res);
a.then(function(data){
		//console.log(data);
		res.end(req.query.callback + "('" + JSON.stringify(data[0]) + "')");	
	});
});

router.post('/postman', function (req, res) {
	var b=models.Room.postdata(req,res);
	b.then(function(data){
		//console.log(data);
		res.end("success");	
	});
});

module.exports = router;
