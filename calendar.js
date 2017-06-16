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
  var data={
 "kind": "admin#directory#resources#calendars#calendarResourcesList",
 "etag": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/h-i4etVwNxSD2MzazbGFnqZkICM\"",
 "items": [
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/CCoPzc2JJL8h7s2Dj6YQ-BhYCvM\"",
   "resourceId": "-33795476742",
   "resourceName": "Barzan - Yellow - S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3333373935343736373432@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/NEgEJvUF1p34ZZ9OT4z__zxmfVc\"",
   "resourceId": "-2304744269",
   "resourceName": "GST-Green-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To HR Bay",
   "resourceEmail": "freshdesk.com_2d32333034373434323639@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/p8iwjtQVU9VQVqIZEPC_FngXs8c\"",
   "resourceId": "37786885189",
   "resourceName": "Kovalam beach-Yellow -4S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To Support Team",
   "resourceEmail": "freshdesk.com_3337373836383835313839@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/1SYehkeqE-l6DYQfPD6xGLmA9G8\"",
   "resourceId": "74791329621",
   "resourceName": "Cathedral road-Green-4S-Ph",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To Finance Bay",
   "resourceEmail": "freshdesk.com_3734373931333239363231@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/pHb2JR4L4ytH43lZT-BAMoO0JyM\"",
   "resourceId": "-38946244637",
   "resourceName": "Earth-Red-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d3338393436323434363337@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/2MEbZ7mAAddOJrIMqCO0RV2NCJw\"",
   "resourceId": "8359371354",
   "resourceName": "Pluto-Red-4S-Ph",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_38333539333731333534@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/pl-dHAuENqivmwFXu5J5Nj0PscY\"",
   "resourceId": "57180606231",
   "resourceName": "Santa Maria-Green-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3537313830363036323331@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/fNK_ymKxBN2fvdRfiwXPkzTjJzo\"",
   "resourceId": "70858135298",
   "resourceName": "Mercury-Red-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_3730383538313335323938@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/b0iVEwqA1i1cJAbPdflx3isnhJI\"",
   "resourceId": "7723613211",
   "resourceName": "Greams road-Green-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To Finance Bay",
   "resourceEmail": "freshdesk.com_37373233363133323131@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/Ia5RMMZAKWrdcJFpjw3NdyGhcVQ\"",
   "resourceId": "9986252301",
   "resourceName": "INS Viraat - Yellow - S4",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_39393836323532333031@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/kMLRGwztiOzKwieWkgYZtvZ24kI\"",
   "resourceId": "91058386789",
   "resourceName": "Chennai Central-Yellow-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_3931303538333836373839@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/TaKe9r4c1KcfP7v9mAxdVVLKRWg\"",
   "resourceId": "-73680191259",
   "resourceName": "Seraph - Green - 5S",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3733363830313931323539@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/wsLHuhQen2cIyC1p_-zxt8ucVXw\"",
   "resourceId": "151624303",
   "resourceName": "Asgard-Blue-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_313531363234333033@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/hZhhIy2MwIlkhXqo0iXZuBuOmVo\"",
   "resourceId": "-23123939242",
   "resourceName": "Santhome beach-Yellow-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_2d3233313233393339323432@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/R2nP2KMM6ZfX70gPz7FOzJv3MS0\"",
   "resourceId": "78069935352",
   "resourceName": "Naboo-Blue-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near NOC Team",
   "resourceEmail": "freshdesk.com_3738303639393335333532@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/FBljGpaEMkSePQV-gRLZep64BpY\"",
   "resourceId": "53755622911",
   "resourceName": "Fort St. George-Yellow-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_3533373535363232393131@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/UA2FCn1p-h-lGqpSAIO4018uQOQ\"",
   "resourceId": "6583646806",
   "resourceName": "Unicorn - Blue -S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_36353833363436383036@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/FpZe11vo1hzsVHtbySdcpw2Sdc0\"",
   "resourceId": "50259259232",
   "resourceName": "INS S-21 - Yellow - S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3530323539323539323332@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/AUPYI2wtm_qIdbxlKaeHSswwz_8\"",
   "resourceId": "95056447198",
   "resourceName": "Scorpion - Green -10S 1TV",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3935303536343437313938@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/2oSOqr7j0OJ_HlcAtCyhOEX-amI\"",
   "resourceId": "-36066766-633",
   "resourceName": "Tatooine-Blue-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d33363036363736362d363333@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/u9u4gxGcAh_qvZKLxvOGhqJetrM\"",
   "resourceId": "19277957348",
   "resourceName": "Poseidon - Blue - S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3139323737393537333438@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/9D0KgwbjeAyXGPgQ2w-6U3mafbU\"",
   "resourceId": "-31310569370",
   "resourceName": "Rippon Building-Yellow-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_2d3331333130353639333730@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/r-NzEyX14ePWqJmVmGvDomcxzNk\"",
   "resourceId": "-17923588982",
   "resourceName": "Cutty sark - Yellow - S5",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3137393233353838393832@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/31TE4KYTziXD2lxck-j-cuTmNuc\"",
   "resourceId": "5952050-119",
   "resourceName": "Planet X-Blue-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_353935323035302d313139@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/zbrDBY7roybKmIHA5Y6BTPgmx2I\"",
   "resourceId": "-88291951983",
   "resourceName": "Vulcan-Blue-2S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d3838323931393531393833@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/jHiW5GD_iyBtgPFr01qPl0v99VA\"",
   "resourceId": "3505358520",
   "resourceName": "Seawise gaint-Green-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_33353035333538353230@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/T9VClilP9t5sL4pcwcacQEsjqZ0\"",
   "resourceId": "-94824945-339",
   "resourceName": "Neptune-Red-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d39343832343934352d333339@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/fY8mnVPySEoQue2AWci3BGgsGIA\"",
   "resourceId": "-77173218952",
   "resourceName": "Color magic -Yellow -S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3737313733323138393532@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/sPowGTWlULXZvTbXova5OKgYL70\"",
   "resourceId": "725731090",
   "resourceName": "Spencers Plaza-Yellow-6S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_373235373331303930@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/pXb4W0oS0tW82hDsoiIBNZTHq7Q\"",
   "resourceId": "53839989334",
   "resourceName": "Light House-Yellow-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor C Block Entrance",
   "resourceEmail": "freshdesk.com_3533383339393839333334@resource.calendar.google.com"
  },
  
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/tidtifqpQsh1tCNRrII-IZhCrIM\"",
   "resourceId": "65711402563",
   "resourceName": "ECR-Green-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To HR Bay",
   "resourceEmail": "freshdesk.com_3635373131343032353633@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/L5orGK8gmzTxBHdd0NYiNtf6onU\"",
   "resourceId": "-83994473377",
   "resourceName": "Sea shadow - Green - 3S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3833393934343733333737@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/MTrt63biPndKGvXU2i48is_x4RM\"",
   "resourceId": "32277250862",
   "resourceName": "Golden beach-Yellow-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_3332323737323530383632@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/mBlZbST0-Oqbt55eLouCar_ZVEU\"",
   "resourceId": "-76730680492",
   "resourceName": "Flying dutchman - Blue - S4",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3736373330363830343932@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/KRRM3_2g0ff492hepRz3CEw4VHs\"",
   "resourceId": "-8381449725",
   "resourceName": "Admiral - Yellow -S3",
   "resourceType": "conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d38333831343439373235@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/5GTwXjS_kEDJvdJShyucTxxCDV0\"",
   "resourceId": "8638775614",
   "resourceName": "Theosophical Society-Yellow-6S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_38363338373735363134@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/plcHbFElv17Adq3l4UTtV4hgcNw\"",
   "resourceId": "6926676826",
   "resourceName": "Boat club-Yellow-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_36393236363736383236@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/rQ2eE5pLOkvuGGWU4bNZGY_U8HE\"",
   "resourceId": "-33376981-147",
   "resourceName": "Cybertron-Blue-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d33333337363938312d313437@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/Eq5M31JhaOqvwUJivNRYn9eIDto\"",
   "resourceId": "-16440917407",
   "resourceName": "Titanic - Blue - S10 TV1",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3136343430393137343037@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/3w3X-KeTgm2tuN4rE0Nm_mUIhEQ\"",
   "resourceId": "9810514-782",
   "resourceName": "Coruscant-Blue-5S-Ph",
   "resourceType": "Conference room",
   "resourceDescription": "Near Noc 1st Floor Block B",
   "resourceEmail": "freshdesk.com_393831303531342d373832@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/S80q-dVWKACVJeZFlh97EjTjJvU\"",
   "resourceId": "-4160559506",
   "resourceName": "INS Arihant - Yellow -S4",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d34313630353539353036@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/MgJ8GDdEj9XjQzX050Y-xNnYWSo\"",
   "resourceId": "-96410039882",
   "resourceName": "Argo - Yellow - S3",
   "resourceType": "conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3936343130303339383832@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/rKI2YVN_E8LnByIUaEeN15nHZDU\"",
   "resourceId": "67524353658",
   "resourceName": "INS Chakra - Yellow -S3",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3637353234333533363538@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/_CMEm1Y5Aa52SWGxjBj6igxJ--o\"",
   "resourceId": "-69772421815",
   "resourceName": "Krypton-Blue-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d3639373732343231383135@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/duqmYVFjcgLH3KqxIURWnsMQZ-c\"",
   "resourceId": "9683716286",
   "resourceName": "OMR-Green-6S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To HR Bay",
   "resourceEmail": "freshdesk.com_39363833373136323836@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/7mU5IHBPaqcKKfpVxKjTZlUCbfU\"",
   "resourceId": "-75334227349",
   "resourceName": "Solar sailor -Green -3S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3735333334323237333439@resource.calendar.google.com"
  },
 
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/G_DgXiCnYHywjUb1A3ebc59wNeU\"",
   "resourceId": "7081880876",
   "resourceName": "Valluvar Kottam-Yellow-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_37303831383830383736@resource.calendar.google.com"
  },


  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/-aReqKxrswOJOBgmK_layWexDSs\"",
   "resourceId": "-49027395556",
   "resourceName": "Venus-Red-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d3439303237333935353536@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/8jznNNiaaeznnnNTA9zLRniZjRE\"",
   "resourceId": "7513666751",
   "resourceName": "Batillus - Yellow - S5",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_37353133363636373531@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/bwMPfeyY_xNcwz1HLp9Fc_IkIDg\"",
   "resourceId": "-2162564839",
   "resourceName": "TTK road-Green-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "Near To Finance Bay",
   "resourceEmail": "freshdesk.com_2d32313632353634383339@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/_9UdbiUAeyDqQZacn6fXiuMdNFI\"",
   "resourceId": "-8529804917",
   "resourceName": "Napier Bridge-Yellow-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_2d38353239383034393137@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/Dzzx3Z4yuvfGn-x3QVa-kDciRO0\"",
   "resourceId": "-34196433173",
   "resourceName": "Black pearl - Blue - S4",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3334313936343333313733@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/U2KuxpDaDQgJWmYF7XUHBkWOuTc\"",
   "resourceId": "-97176034942",
   "resourceName": "Elliots beach-Yellow-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_2d3937313736303334393432@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/0HccoPwnpvfCyv42U5Jx5_juHzM\"",
   "resourceId": "-59972102908",
   "resourceName": "Beagle - Yellow - S20 TV1",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d3539393732313032393038@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/v2aAedXyXkYItCJvHAykUymSSjc\"",
   "resourceId": "99910672770",
   "resourceName": "Miller's Planet-Blue-3S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_3939393130363732373730@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/OaphXNo-jyDEDjde1FSv1YCZaCs\"",
   "resourceId": "91722627271",
   "resourceName": "Seeadler - Green -5S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3931373232363237323731@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/7dgAozqMmLE7n5_9vYIx3pMcG78\"",
   "resourceId": "81429221613",
   "resourceName": "Challenger - Yellow -S5",
   "resourceType": "Conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3831343239323231363133@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/HVBefPLgziriRMB3qmd5_Jsr_Ok\"",
   "resourceId": "-8081682578",
   "resourceName": "Kapaleeshwara Temple-Yellow-10S-TV",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block C",
   "resourceEmail": "freshdesk.com_2d38303831363832353738@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/R0KmnzEmmGVgLeOjKJH_YSaDkXE\"",
   "resourceId": "24067767966",
   "resourceName": "Mars-Red-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_3234303637373637393636@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/uxGwC2YGfUdABUD16UuS9VIZP64\"",
   "resourceId": "-2739503826",
   "resourceName": "Sao Gabriel-Green-5S",
   "resourceType": "Conference Room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_2d32373339353033383236@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/zr_pH5BlZEC6tbmUsHlz4QgdWKY\"",
   "resourceId": "45210889109",
   "resourceName": "Amethyst - Yellow -5S",
   "resourceType": "conference room",
   "resourceDescription": "Ground Floor",
   "resourceEmail": "freshdesk.com_3435323130383839313039@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/Jk6lJ6frFmSyCkjcfW3bKktb4hM\"",
   "resourceId": "99234690-297",
   "resourceName": "Andromeda-Blue-56S-TV",
   "resourceType": "Small Cafeteria / Conferece Room",
   "resourceDescription": "Small Cafeteria 1st Floor",
   "resourceEmail": "freshdesk.com_39393233343639302d323937@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/WuVILV7Y5IKUwZQH1AR6aPQD2ZM\"",
   "resourceId": "-37784764106",
   "resourceName": "Sun-Red-22S-TV",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d3337373834373634313036@resource.calendar.google.com"
  },
  {
   "kind": "admin#directory#resources#calendars#CalendarResource",
   "etags": "\"eqO3c9wtJJ4wVWz2xe0E9HiU_D0/IU_E2Zcxs4qxf-cZrKsS76FXcoc\"",
   "resourceId": "-4984500979",
   "resourceName": "Uranus-Red-4S",
   "resourceType": "Conference Room",
   "resourceDescription": "1st Floor Block B",
   "resourceEmail": "freshdesk.com_2d34393834353030393739@resource.calendar.google.com"
  }
 ]
};


//Trying to get data from http request        
/*http.get("https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars", function(res) {
  var body = ''; // Will contain the final response
  // Received data is a buffer.
  // Adding it to our body
  res.on('data', function(data){
    body += data;
  });
  // After the response is completed, parse it and log it to the console
  res.on('end', function() {
    var parsed = JSON.parse(body);
    console.log(parsed);
  });
})		*/
		
var a=["ship-20","gst","kovalam","cathedralroad","earth","pluto","ship-2","mercury","greamesroad","ship-24","chennaicentral","ship-7","asgard","santhome","naboo","fortstgeorge","ship-11","ship-21","ship-6","tatooine","ship-12","ripponbuilding","ship-27","planetx","vulcan","ship-3","neptune","ship-26","spencerplaza","lighthouse","ecr","ship-5","golden","ship-9","ship-15","theosophicalsociety","boatclub","cybertron","ship-13","coruscant","ship-23","ship-14","ship-22","krypton","omr","ship-4","valluvarkottam","venus","ship-18","ttkroad","napierbridge","ship-10","elliots","ship-17","millers","ship-8","ship-25","kapaleeshwartemple","mars","ship-1","ship-16","matrix","sun","uranus"];
var c= ["Barzan - Yellow - S3","Alan Turing-Green-5S, Larry Page-Green-5S","Kovalam beach-Yellow -4S","Cathedral road-Green-4S-Ph"," Earth-Red-4S","Pluto-Red-4S-Ph","Santa Maria-Green-3S","Mercury-Red-5S","Greams road-Green-5S","INS Viraat - Yellow - S4","Chennai Central-Yellow-5S","Seraph - Green - 5S","Asgard-Blue-5S", "Santhome beach-Yellow-5S","Lord of the Rings-Purple-4S","Fort St. George-Yellow-4S","Unicorn - Blue -S3","INS S-21 - Yellow - S3","Scorpion - Green -10S 1TV","Tatooine-Blue-4S","Poseidon - Blue - S3","Rippon Building-Yellow-4S","Cutty sark - Yellow - S5","Planet X-Blue-3S","Vulcan-Blue-2S","Seawise gaint-Green-3S","Neptune-Red-5S","Color magic -Yellow -S3","Spencers Plaza-Yellow-6S","Light House-Yellow-4S","Alan Turing-Green-5S, Larry Page-Green-5S","Seawise gaint-Green-3S","Golden beach-Yellow-3S","Flying dutchman - Blue - S4","Admiral - Yellow -S3","Theosophical Society-Yellow-6S","Boat club-Yellow-3S","Cybertron-Blue-4S","Titanic - Blue - S10 TV1","Coruscant-Blue-5S-Ph","INS Arihant - Yellow -S4","Argo - Yellow - S3","INS Chakra - Yellow -S3","Krypton-Blue-4S","OMR-Green-6S","Solar sailor -Green -3S","Valluvar Kottam-Yellow-5S","Venus-Red-5S","Batillus - Yellow - S5","TTK road-Green-4S","Napier Bridge-Yellow-4S","Black pearl - Blue - S4","Elliots beach-Yellow-3S","Beagle - Yellow - S20 TV1","Miller's Planet-Blue-3S","Seeadler - Green -5S","Challenger - Yellow -S5","Kapaleeshwara Temple-Yellow-10S-TV","Mars-Red-5S","Sao Gabriel-Green-5S","Amethyst - Yellow -5S","Andromeda-Blue-56S-TV","Sun-Red-22S-TV","Uranus-Red-4S"];
//console.log(data.items.length);
for (var h=0; h<data.items.length; h++){
            var sql = "UPDATE rooms SET calendar = ? where roomname = ?";
  connection.query(sql,['0', a[h]], function (err, result) {
    if (err) throw err;
  });
}

var flag=0;
  var calendar = google.calendar('v3');
  for(i=0;i<data.items.length;i++){
  calendar.events.list({
    auth: auth,
    calendarId: data.items[i].resourceEmail,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      //console.log('No upcoming events.');
    } else {
 //        console.log("events:"+events[0].location);
        var b =  (new Date());
            for (var j = 0; j < events.length; j++) {
        var d=new Date(Date.parse(events[j].start.dateTime));
        var e=new Date(Date.parse(events[j].end.dateTime));
        if(b.getHours()>= d.getHours() && b.getHours()<= e.getHours() && d.getDate()==b.getDate() && b.getMonth()==d.getMonth())
        {
            for(v=0;v<data.items.length;v++)
            {
                if(c[v]==events[j].location)
                    break;
            }
            console.log("events:"+events[j].location+"   " + a[v]);
            var sql = "UPDATE rooms SET calendar = ? where roomname = ?";
  connection.query(sql,['1', a[v]], function (err, result) {
    if (err) throw err;
  });
        }//if
        
    }//for
     
    }//else
  });//function,calendar.events.list
  
}//for
}//function