var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    // if ('OPTIONS' == req.method) {
    //   res.send(200);
    // }
    // else {
      next();
    // }
};

app.use(allowCrossDomain);

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.set('port', (process.env.PORT || 3000));

// app.get('/', function(req, res) {
//   res.send("gotten to home page");
// })
// dommy data
var routes = require('./routes/donate');


// app.use(function(req, res, next) { 
//     var err = new Error('Page Not Found'); 
//     err.status = 404; 
//     next(err); 
// });
//to allow cross browsers api calls


app.use("/", routes);

app.listen(app.get('port'), function() {
  console.log("Miracles happen on " + app.get('port') + app.get('env'));
});