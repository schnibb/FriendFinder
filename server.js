//require express
var express = require("express");

var app = express();
//define the port to use
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//set routing requirements.
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

//check the the server is connected and report the port number.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});