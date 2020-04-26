const express = require('express');
const router = express.Router();

// GET 'homelist' page - ok
const homelist = (req, res) => {
    res.render('locations-list', { title: 'Locations' });
};

// GET 'Location info' page - ok
const locationInfo = (req, res) => {
    res.render('location-info', { title: 'Location Info' });
};

// GET 'Add review' page - ok
const addReview = (req, res) => {
    res.render('location-review-form', { title: 'Add review' });
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};