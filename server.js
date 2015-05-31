var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = express();
var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_full_cleaned_statted_object.json'), 'utf8'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/company/:ico', function (request, response) {
  var ico = request.params.ico ? request.params.ico.trim() : undefined;

  response.header("Access-Control-Allow-Origin", "*");

  if (data[ico]) {
    response.json(data[ico]);
  } else {
    response.sendStatus(404);
  }
});

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Ad Server listening on port ' + server.address().port);
});