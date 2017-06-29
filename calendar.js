var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var http=require('http');
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser =    require("body-parser");
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function tt()
{
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : 'meeting'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
//console.log(TOKEN_PATH);

// Load client secrets from a local file.

  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(process.env.SECRET), listEvents);



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
    //console.log("token:"+JSON.parse(token));
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

 
function listEvents(auth) {
	
	/*var GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;
 console.log(GoogleTokenProvider);
var tokenProvider = new GoogleTokenProvider({
	grant_type: refresh_token,
    refresh_token: "1%2FRRlw68iFbDw4zhj9EsfhyotXAEdikS1TjmDRCUlSOIQ", 
    client_id:     "343606379462-q07eoll5fm4toj109ahr8v6nh91oup9e.apps.googleusercontent.com", 
    client_secret: "2l5rj0tmDpglD_muqyNOtoEE"
  });		
tokenProvider.getToken(function (err, token) {
  if(err)
  {
	  console.log(err);
  }
  else
  {
	  console.log(token);*/
	  
var TokenProvider = require('refresh-token');
 
var tokenProvider = new TokenProvider('https://www.googleapis.com/oauth2/v3/token', {
    refresh_token: process.env.REFRESH, 
    client_id:     process.env.CID, 
    client_secret: process.env.CSECRET
    /* you can pass an access token optionally
    access_token:  'fdlaksd',
    expires_in:    2133
    */
  });
 
tokenProvider.getToken(function (err, token) {
 //token will be a valid access token. 
 if(err)
	 console.log(err);
 else{
 console.log(token);
 var request = require('request');

// Set the headers
var headers = {
    'Content-Type': 'application/json',
	'Authorization': 'Bearer ' + token
}

var options = {
    url: 'https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars',
    method: 'GET',
    headers: headers,
}

// Start the request
request(options, function (error, response, data) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        data=JSON.parse(data);

console.log(data.items.length);
for (var h=0; h<data.items.length; h++){
            var sql = "UPDATE rooms SET calendar = ?";
  connection.query(sql,['0'], function (err, result) {
    if (err) throw err;
  });
}

var flag=0;
  var calendar = google.calendar('v3');
  for(i=0;i<data.items.length;i++){
	//  console.log(i);
  calendar.events.list({
    auth: auth,
    calendarId:data.items[i].resourceEmail,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
	//console.log('hi');
    var events = response.items;
    if (events.length == 0) {
      //console.log('No upcoming events.');
    } else {
 //        console.log("events:"+events[0].location);
        var b =  (new Date());
            for (var j = 0; j < events.length; j++) {
				var event = events[j];
      //  var start = event.start.dateTime || event.start.date;
	//	var end=event.end.dateTime || event.end.date;
      //  console.log('%s - %s    %s      %d %s      %s', start,end,event.location);
        var d=new Date(Date.parse(events[j].start.dateTime));
        var e=new Date(Date.parse(events[j].end.dateTime));
        if(b.getHours()>= d.getHours() && b.getHours()<= e.getHours() && d.getDate()==b.getDate() && b.getMonth()==d.getMonth())
        {
            console.log("events:"+events[j].location);
            var sql = "UPDATE rooms SET calendar = ? where roomname1 = ?";
  connection.query(sql,['1', events[j].location], function (err, result) {
    if (err) throw err;
  });
        }//if
        
    }//for
     
    }//else
  });//function,calendar.events.list
  
}//for
 }//else of request function
})//request function
 }//else of tokenprovider
});//function token provider
//var sleep=require('system-sleep');
//sleep(60000);
}//function listEvents
//setInterval(listEvents,30000);
}
setInterval(tt,30000);
