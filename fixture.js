var sqlFixtures = require('sql-fixtures');
 require('dotenv').config();
// depending on which database engine you are using 
// this is a typical PostgreSQL config for the pg driver 
var dbConfig = {
	client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'ubuntu',
    password:'ubuntu',
    database: 'circle_test'
  }
};
 
var dataSpec = {
  rooms:[{"id":1,"roomname":"mercury","roomname1":"Mercury-Red-4S","status":2,"sensor":0,"calendar":0},{"id":2,"roomname":"venus","roomname1":"Venus-Red-5S","status":2,"sensor":1,"calendar":0},{"id":3,"roomname":"earth","roomname1":" Earth-Red-4S","status":1,"sensor":1,"calendar":0},{"id":4,"roomname":"mars","roomname1":"Mars-Red-5S","status":0,"sensor":0,"calendar":0},{"id":5,"roomname":"winterfell","roomname1":"","status":2,"sensor":0,"calendar":0},{"id":6,"roomname":"hardhome","roomname1":"","status":1,"sensor":0,"calendar":0},{"id":7,"roomname":"sun","roomname1":"Sun-Red-22S-TV","status":1,"sensor":0,"calendar":0},{"id":8,"roomname":"planetx","roomname1":"Planet X-Blue-3S","status":0,"sensor":0,"calendar":0},{"id":9,"roomname":"millers","roomname1":"Millers Planet-Blue-3S","status":1,"sensor":0,"calendar":0},{"id":10,"roomname":"krypton","roomname1":"Krypton-Blue-4S","status":1,"sensor":0,"calendar":0},{"id":11,"roomname":"asgard","roomname1":"Asgard-Blue-5S","status":0,"sensor":0,"calendar":0},{"id":12,"roomname":"vulcan","roomname1":"Vulcan-Blue-2S","status":2,"sensor":0,"calendar":0},{"id":13,"roomname":"cybertron","roomname1":"Cybertron-Blue-4S","status":0,"sensor":0,"calendar":0},{"id":14,"roomname":"neptune","roomname1":"Neptune-Red-5S","status":1,"sensor":0,"calendar":0},{"id":16,"roomname":"uranus","roomname1":"Uranus-Red-4S","status":1,"sensor":0,"calendar":0},{"id":17,"roomname":"pluto","roomname1":"Pluto-Red-4S-Ph","status":0,"sensor":0,"calendar":0},{"id":18,"roomname":"tatooine","roomname1":"Tatooine-Blue-4S","status":1,"sensor":0,"calendar":0},{"id":19,"roomname":"naboo","roomname1":"Lord of the Rings-Purple-4S","status":0,"sensor":0,"calendar":0},{"id":20,"roomname":"coruscant","roomname1":"Coruscant-Blue-5S-Ph","status":0,"sensor":0,"calendar":0},{"id":21,"roomname":"matrix","roomname1":"Andromeda-Blue-56S-TV","status":2,"sensor":0,"calendar":0},{"id":22,"roomname":"ecr","roomname1":"Alan Turing-Green-5S, Larry Page-Green-5S","status":1,"sensor":0,"calendar":0},{"id":23,"roomname":"omr","roomname1":"OMR-Green-6S","status":2,"sensor":0,"calendar":0},{"id":24,"roomname":"gst","roomname1":"Alan Turing-Green-5S, Larry Page-Green-5S","status":0,"sensor":0,"calendar":0},{"id":25,"roomname":"mountroad","roomname1":"hi","status":1,"sensor":0,"calendar":0},{"id":26,"roomname":"greamesroad","roomname1":"Greams road-Green-5S","status":2,"sensor":0,"calendar":0},{"id":27,"roomname":"cathedralroad","roomname1":"Cathedral road-Green-4S-Ph","status":1,"sensor":0,"calendar":0},{"id":28,"roomname":"ttkroad","roomname1":"TTK road-Green-4S","status":0,"sensor":0,"calendar":0},{"id":29,"roomname":"lighthouse","roomname1":"Light House-Yellow-4S","status":1,"sensor":1,"calendar":0},{"id":30,"roomname":"napierbridge","roomname1":"Napier Bridge-Yellow-4S","status":0,"sensor":0,"calendar":0},{"id":31,"roomname":"valluvarkottam","roomname1":"Valluvar Kottam-Yellow-5S","status":1,"sensor":0,"calendar":0},{"id":32,"roomname":"theosophicalsociety","roomname1":"Theosophical Society-Yellow-6S","status":2,"sensor":0,"calendar":0},{"id":33,"roomname":"kapaleeshwartemple","roomname1":"Kapaleeshwara Temple-Yellow-10S-TV","status":0,"sensor":0,"calendar":0},{"id":34,"roomname":"ripponbuilding","roomname1":"Rippon Building-Yellow-4S","status":1,"sensor":0,"calendar":0},{"id":35,"roomname":"fortstgeorge","roomname1":"Fort St. George-Yellow-4S","status":2,"sensor":0,"calendar":0},{"id":36,"roomname":"chennaicentral","roomname1":"Chennai Central-Yellow-5S","status":0,"sensor":0,"calendar":0},{"id":37,"roomname":"boatclub","roomname1":"Boat club-Yellow-3S","status":0,"sensor":0,"calendar":0},{"id":38,"roomname":"spencerplaza","roomname1":"Spencers Plaza-Yellow-6S","status":1,"sensor":0,"calendar":0},{"id":39,"roomname":"golden","roomname1":"Golden beach-Yellow-3S","status":2,"sensor":0,"calendar":0},{"id":40,"roomname":"santhome","roomname1":"Santhome beach-Yellow-5S","status":1,"sensor":0,"calendar":0},{"id":41,"roomname":"gameofthrones","roomname1":"hi","status":0,"sensor":0,"calendar":0},{"id":42,"roomname":"kovalam","roomname1":"Kovalam beach-Yellow -4S","status":1,"sensor":0,"calendar":0},{"id":43,"roomname":"elliots","roomname1":"Elliots beach-Yellow-3S","status":2,"sensor":0,"calendar":0},{"id":44,"roomname":"ship-1","roomname1":"Sao Gabriel-Green-5S","status":2,"sensor":0,"calendar":0},{"id":45,"roomname":"ship-2","roomname1":"Santa Maria-Green-3S","status":1,"sensor":0,"calendar":0},{"id":46,"roomname":"ship-3","roomname1":"Seawise gaint-Green-3S","status":0,"sensor":0,"calendar":0},{"id":47,"roomname":"ship-4","roomname1":"Solar sailor -Green -3S","status":1,"sensor":0,"calendar":0},{"id":48,"roomname":"ship-5","roomname1":"Sea shadow - Green - 3S","status":1,"sensor":0,"calendar":0},{"id":49,"roomname":"ship-6","roomname1":"Scorpion - Green -10S 1TV","status":2,"sensor":0,"calendar":0},{"id":50,"roomname":"ship-7","roomname1":"Seraph - Green - 5S","status":0,"sensor":0,"calendar":0},{"id":51,"roomname":"ship-8","roomname1":"Seeadler - Green -5S","status":0,"sensor":0,"calendar":0},{"id":52,"roomname":"ship-9","roomname1":"Flying dutchman - Blue - S4","status":1,"sensor":0,"calendar":0},{"id":53,"roomname":"ship-10","roomname1":"Black pearl - Blue - S4","status":1,"sensor":0,"calendar":0},{"id":54,"roomname":"ship-11","roomname1":"Unicorn - Blue -S3","status":2,"sensor":0,"calendar":0},{"id":55,"roomname":"ship-12","roomname1":"Poseidon - Blue - S3","status":1,"sensor":0,"calendar":0},{"id":56,"roomname":"ship-13","roomname1":"Titanic - Blue - S10 TV1","status":2,"sensor":0,"calendar":0},{"id":57,"roomname":"ship-14","roomname1":"Argo - Yellow - S3","status":0,"sensor":0,"calendar":0},{"id":58,"roomname":"ship-15","roomname1":"Admiral - Yellow -S3","status":0,"sensor":0,"calendar":0},{"id":59,"roomname":"ship-16","roomname1":"Amethyst - Yellow -5S","status":1,"sensor":0,"calendar":0},{"id":60,"roomname":"ship-17","roomname1":"Beagle - Yellow - S20 TV1","status":2,"sensor":0,"calendar":0},{"id":61,"roomname":"ship-18","roomname1":"Batillus - Yellow - S5","status":0,"sensor":0,"calendar":0},{"id":62,"roomname":"ship-19","roomname1":"hi","status":1,"sensor":0,"calendar":0},{"id":63,"roomname":"ship-20","roomname1":"Barzan - Yellow - S3","status":2,"sensor":0,"calendar":0},{"id":64,"roomname":"ship-21","roomname1":"INS S-21 - Yellow - S3","status":0,"sensor":0,"calendar":0},{"id":65,"roomname":"ship-22","roomname1":"INS Chakra - Yellow -S3","status":2,"sensor":0,"calendar":0},{"id":66,"roomname":"ship-23","roomname1":"INS Arihant - Yellow -S4","status":1,"sensor":0,"calendar":0},{"id":67,"roomname":"ship-24","roomname1":"INS Viraat - Yellow - S4","status":0,"sensor":0,"calendar":0},{"id":68,"roomname":"ship-25","roomname1":"Challenger - Yellow -S5","status":1,"sensor":0,"calendar":0},{"id":69,"roomname":"ship-26","roomname1":"Color magic -Yellow -S3","status":1,"sensor":0,"calendar":0},{"id":70,"roomname":"ship-27","roomname1":"Cutty sark - Yellow - S5","status":1,"sensor":0,"calendar":0},{"id":71,"roomname":"cathedralroad","roomname1":"CV Raman-Green-4S-Ph","status":0,"sensor":0,"calendar":0},{"id":72,"roomname":"pluto","roomname1":"Rock-Black-4S-Ph","status":0,"sensor":0,"calendar":0},{"id":73,"roomname":"greamesroad","roomname1":"Bill Gates-Green-5S","status":0,"sensor":0,"calendar":0},{"id":74,"roomname":"asgard","roomname1":"Comic Sans-Orange-5S","status":0,"sensor":0,"calendar":0},{"id":75,"roomname":"naboo","roomname1":"Naboo-Blue-4S","status":0,"sensor":0,"calendar":0},{"id":76,"roomname":"tatooine","roomname1":"Harry Potter-Purple-4S","status":0,"sensor":0,"calendar":0},{"id":77,"roomname":"tatooine","roomname1":"El Dorado [Green] 4S - P","status":0,"sensor":0,"calendar":0},{"id":78,"roomname":"planetx","roomname1":"Yin-Pink-3S","status":0,"sensor":0,"calendar":0},{"id":79,"roomname":"vulcan","roomname1":"Calibri-Orange-2S","status":0,"sensor":0,"calendar":0},{"id":80,"roomname":"cybertron","roomname1":"Helvetica-Orange-4S","status":0,"sensor":0,"calendar":0},{"id":81,"roomname":"coruscant","roomname1":"Bedrock [Green] 4S - P","status":0,"sensor":0,"calendar":0},{"id":82,"roomname":"coruscant","roomname1":"Dar Knight-Purple-5S-Ph","status":0,"sensor":0,"calendar":0},{"id":83,"roomname":"krypton","roomname1":"Naboo [Blue] 4S   P","status":0,"sensor":0,"calendar":0},{"id":84,"roomname":"venus","roomname1":"Megakat City [Red] 4S - P","status":0,"sensor":0,"calendar":0},{"id":85,"roomname":"millers","roomname1":"Yang-Pink-3S","status":0,"sensor":0,"calendar":0},{"id":86,"roomname":"mars","roomname1":"NodeJs-Red-5S","status":0,"sensor":0,"calendar":0},{"id":87,"roomname":"uranus","roomname1":"Metropolis [Blue] 4S Â  P  T","status":0,"sensor":0,"calendar":0},{"id":88,"roomname":"mercury","roomname1":"MySQL-Red-5S","status":0,"sensor":0,"calendar":0}]
};
 
sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
  // at this point a row has been added to the users table 
  console.log(result.rooms[0].roomname1);
});
process.exit();
