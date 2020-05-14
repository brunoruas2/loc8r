const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance = (req, res) => {
  Loc.aggregate([{$geoNear: {near: {}, distanceField: "distance", maxDistance: 100}}]);
};

const locationsCreate = (req, res) => { };

const locationsReadOne = (req, res) => {
  // Searching the document with the locationid inputed in the url
  Loc
    .findById(req.params.locationid)
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
      } else {
        res
        .status(200)
        .json(location)
      }
    })
};

const locationsUpdateOne = (req, res) => { };

const locationsDeleteOne = (req, res) => { };


module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};