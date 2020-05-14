const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = (req, res) => { };

const reviewsReadOne = (req, res) => {
    // Searching the document with the locationid inputed in the url
    Loc
    .findById(req.params.locationid)
    .select('name reviews') // Adds mongoose select method for model query
    .exec((err, location) => {
      // Error 1: location not found
      if (!location) {
        return res
          .status(404)
          .json({
            "message" : "location not found"
          });
      } else if (err) { // Error 2: Mongoose return a error
        return res
          .status(400)
          .json(err);
      }
      // Check if location has reviews
      if (location.reviews && location.reviews.length > 0) {
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
          return res
            .status(400)
            .json({
              "message" : "review not found"
            });
        } else {
          response = {
            location : {
              name : location.name,
              id : req.params.locationid
            },
            review
          }
          return res
            .status(200)
            .json(response);
        }
      } else {
        return res
          .status(404)
          .json({
            "message" : "No reviews found"
          });
        }
    })
};

const reviewsUpdateOne = (req, res) => { };

const reviewsDeleteOne = (req, res) => { };


module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};