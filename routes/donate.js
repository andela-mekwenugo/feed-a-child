var express = require('express');

var mongoose = require('mongoose');

require('../models/db');

var Donate = mongoose.model('Donate');

//sending response to the client
var sendResponse = function(response, status,data) {

  response.status(status);
  response.json(data);

}

//creating app router
var router = express.Router();


//defining API route
router.route('/donate')


//doing a get method
.get(function(request, response) {

  Donate
    .find(function(err, donators) {
      if(err) {
        sendResponse(response, 404, err);
      }
      sendResponse(response, 200, donators);

    });
})


//doing a post method

.post(function(request, response) {
  if (!request.body.lastname  || !request.body.firstname  || !request.body.email  || !request.body.location  || !request.body.Amount_to_donate_monthly || !request.body.card_number) {
    sendResponse(response, 400, "All fields must be filled")
  }

  var newDonator = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    location: request.body.location,
    Amount_to_donate_monthly: request.body.Amount_to_donate_monthly,
    card_number: request.body.card_number,
    date_started: request.body.date_started    
  }

  Donate.create(newDonator,function(err, newDonator) {
    if (err) {
      sendResponse(response, 404, err);
    }
    sendResponse(response, 201, newDonator);
  })
});


router.route('/donate/:firstname/edit')

//using the put method
.put(function(request, response) {
  Donate
    .findOneAndUpdate({firstname: request.params.firstname}, request.body,
       function(err, donator) {
        if(err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 201, donator);
    });
});

//using delete method
router.route('/donate/:name/delete')
  .delete(function(request,response) {
    Donate
      .findOneAndRemove({'name': request.params.name}, function(err) {
        if(err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 200, "deleted successfully!!!")
      });
  });

  router.route('/donate/:id')
  .get(function(request, response) {
    Donate
      .findById(request.params.id)
      .exec(function(err, donate) {
        if (err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 200, donate);
      })
  });

module.exports = router;