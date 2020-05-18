const express = require('express');
const router = express.Router();
const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
  };
  if (process.env.NODE_ENV === 'web') {
    apiOptions.server = 'https://stormy-eyrie-13476.herokuapp.com/';
  }

console.log("app_server connected to -> " + apiOptions.server)

//------------------------------- Location List --------------------------------
// Modifying data before displayint: distances
const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = ' m';
    if (distance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        unit = ' km';
    } else {
        thisDistance = Math.floor(distance);
    }
    return thisDistance + unit;
};

// Moving the contents of homelist into an external function
const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (responseBody == "404") {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No places found nearby';
      }
    }
    res.render('locations-list',
      {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
          title: 'Loc8r',
          strapLine: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
        message
      }
    );
};

// GET 'homelist' page
const homelist = (req, res) => {
    const path = '/api/locations';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.7992599,
            lat: 51.378091,
            maxDistance: 20000
        }
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            let data = [];
            if (statusCode === 200 && body.length) {
            data = body.map( (item) => {
                item.distance = formatDistance(item.distance);
                return item;
                });
            }
            // Fixing the not 404 handlig bug
            if (statusCode === 404) {
                data = "404"
            }
            renderHomepage(req, res, data);
        }
    )
};

//------------------------------- Local Info --------------------------------
// Moving contents of the locationInfo into an external function
const renderDetailPage = (req, res, location) => {
    res.render('location-info', {
        title: location.name,
        pageHeader: {
            title: location.name,
        },
        sidebar:{
            context:'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction:"If you've been and you like it - or if you don't. But leave a review to help other people just like you."
        },
        location
    });
};

// GET 'Location info' page
const locationInfo = (req, res) => {
    const path = `/api/locations/${req.params.locationid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, response, body) => {
        const data = body;
        data.coords = {
            lng: body.coords[0],
            lat: body.coords[1]
        };
        // Turning the map static
        data.coords = 'iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15936.768750392297!2d-60.02027928829196!3d-3.043106171570461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c1a1055f67251%3A0x9ae77ab416b67309!2sHappy%20Day%20Futebol%20Society!5e0!3m2!1spt-PT!2sbr!4v1587870062455!5m2!1spt-PT!2sbr" width="100%" height="270" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"';
        renderDetailPage(req, res, data);
        }
    );
    
};

//------------------------------- Reviews --------------------------------
// GET 'Add review' page
const addReview = (req, res) => {
    res.render('location-review-form', {
        title: 'Review Stacups on Loc8r',
        pageHeader: 'Review Starcups'
    });       
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};