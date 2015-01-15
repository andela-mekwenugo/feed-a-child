//requireMongoose
var mongoose = require('mongoose');

//declaring a DATABASE URI
var dbURI = 'mongodb://donate:donate@ds039960.mongolab.com:39960/donate';

//connecting to mongoose
mongoose.connect(dbURI);
var db = mongoose.connection;

//outputing status message to the console
db.on('error', console.error.bind(console, 'connection error: '));
db.once('connected', function() {
  console.log('Mongoose is connected to ' + dbURI);
})


//creating the app schema for the database objects
var donatorSchema =mongoose.Schema({
  lastname : {type : String},
  firstname : {type : String},
  email : {type : String},
  location : {type : String},
  Amount_to_donate_monthly : {type : Number},
  card_number : {type : Number},
  date_started : {type : Date, Default : Date.now}
});

//register schemaas a model
mongoose.model('Donate', donatorSchema);