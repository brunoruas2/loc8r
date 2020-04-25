const express = require('express');
const router = express.Router();

// GET 'homelist' page
const homelist = (req, res) => {
    res.render('locations-list', { title: 'Locations' });
};

// GET 'Location info' page
const locationInfo = (req, res) => {
    res.render('index', { title: 'Location Info' });
};

// GET 'Add review' page
const addReview = (req, res) => {
    res.render('index', { title: 'Add review' });
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};