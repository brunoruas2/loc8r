const express = require('express');
const router = express.Router();

// GET 'homelist' page - ok
const homelist = (req, res) => {
    res.render('locations-list', {
         title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title:'Loc8r',
            strapline: 'Find places to work with wify near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for",
        locations: [{
            name:'Starcups',
            address:'125 High Street, Reading, RG6 1PS',
            rating:3,
            facilities:['Hot drinks','Food','Premium Wifi'],
            distance:'100m'
        },{
            name:'Cafe Hero',
            address:'125 High Street, Reading, RG6 1PS',
            rating:4,
            facilities:['Hot drinks','Premium Wifi'],
            distance:'200m'
        },{
            name:'Burguer Queen',
            address:'125 High Street, Reading, RG6 1PS',
            rating:2,
            facilities:['Hot drinks','Food'],
            distance:'500m'
        }]
    });
};

// GET 'Location info' page - ok
const locationInfo = (req, res) => {
    res.render('location-info', { 
        title: 'Location Info' ,
        pageHeader: {
            title:'Starcups',
            strapline: 'Find places to work with wify near you!'
        },
        rating:4,
        address:'125 High Street, Reading, RG6 1PS',
        sidebar1: 'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
        sidebar2:"if you've been and you like it - or if you don't. But leave a review to help other people just like you.",
        location_info: [{
            opening: ['Monday: 7am-7pm','Saturday: 8am - 5pm'],
            facilities:['Hot drinks','Food','Premium Wifi'],
        }],
        reviews: [{
            name:'Simon Holmes',
            date:'16 February 2017',
            rating:3,
            comment:'What a great place!'
        },{
            name:'Charlie Chaplin',
            date:'15 February 2017',
            rating:2,
            comment:'Coffe gut!'
        }]
    });
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