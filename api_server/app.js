var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();

// app.use(express.bodyParser());

var bigdata = JSON.parse(fs.readFileSync('data_full_cleaned_statted_object.json', 'utf8'));

app.get('/api/company/:ico', function (request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  if (bigdata[request.params.ico] !== undefined){
    response.json(bigdata[request.params.ico]);
  } else {
    response.send('Foo!');
  }
});

http.createServer(app).listen('5000', function() {
	console.log('Express server listening on port 5000');
});
