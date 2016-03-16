(function(){

var express = require('express');
var gearApp = express();
var fs = require('fs');
var restGear;
var config = require('./conf/config');

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

function restGearStart(gearPort) {
    restGear = gearApp.listen(gearPort, function () {
    var port = restGear.address().port;
    console.log("Rest Gear Service Listening on port: " + port);
  });
}

function restGearStop() {
  restGear.close();
}

function restGearAddGet(app, restConf) { 
  var URI = '/' + app + restConf.URI; 
  gearApp.get(URI, function (req, res) {
     fs.readFile( __dirname + "/apps/" + app + "/" + restConf.response_json, 'utf8', function (err, data) {
         // console.log( data );
         res.end( data );
     });
  })  
}

function restGearInit(conf) {
  var apps = conf.apps,
      appConf, appRestConf;

  for ( var app in apps) {
    appConf = apps[app];
    for(var i = 0, len = appConf.length; i < len; i++) {
      appRestConf = appConf[i];      
      switch(appRestConf.type) {
        case "GET":
          restGearAddGet(app, appRestConf);
          break;

        case "POST":
          // restGearAddPost(app, appRestConf);
          break;

        case "DELETE":
          // restGearAddDelete(app, appRestConf);
          break;  
      }

    }
  }


  // gearApp.get('/addUser', function (req, res) {
  //    // First read existing users.
  //    fs.readFile( __dirname + "/sample/data/" + "sample_data.json", 'utf8', function (err, data) {
  //        data = JSON.parse( data );
  //        data["user4"] = user["user4"];
  //        console.log("READ THIS: " +  data );
  //        res.end( JSON.stringify(data));
  //    });
  // })


  // Start services
  start(conf.port);
}


restGearAddGetInit(config);


})();