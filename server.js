var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
	url=require('url');
    app = express(),
    expressValidator = require('express-validator');


/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : 'gayu1997',
        database : 'mroom',
        debug    : false //set true if you wanna see debug logger
    },'request')

);

app.get('/',function(req,res){
    res.send('Welcome');
});


//RESTful route
var router = express.Router();


/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
   // console.log(req.method, req.url);
    next();
});

var curut = router.route('/user');


//show the CRUD interface | GET
curut.get(function(req,res,next){
//req = url.parse(req.url, true);

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM rooms',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
		res.end(req.query.callback + "('" + JSON.stringify(rows) + "')");
		//console.log(req.query.callback + "('" + JSON.stringify(rows) + "')");
//            res.render('user',{title:"RESTful Crud Example",data:rows});
         });

    });

});

//now for Single route (GET,DELETE,PUT)
//var curut2 = router.route('/user/:roomname');
var curut2 = router.route('/user/room');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

remove curut2.all() if you dont want it
------------------------------------------------------*/
curut2.all(function(req,res,next){
    console.log("You need to smth about curut2 Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
curut2.get(function(req,res,next){

    var roomname = req.params.roomname;
	//console.log(val1);
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM rooms WHERE roomname = ? ORDER BY rooms.calendar ASC",[roomname],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("Room Not found");

            res.render('edit',{title:"Edit user",data:rows});
        });

    });

});

//update data
curut2.put(function(req,res,next){
    
	var val1=req.params.roomname;
	//console.log(val1);
	var val2=req.body.roomname;
var data = {
        sensor:req.body.sensor
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE rooms set ? WHERE roomname = ? ",[data,val2], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});


//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(5000,function(){

   console.log("Listening to port %s",server.address().port);

});
