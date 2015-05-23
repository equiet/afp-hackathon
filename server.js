var express = require("express"),
    path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "public")));

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Ad Server listening on port ' + server.address().port);
});