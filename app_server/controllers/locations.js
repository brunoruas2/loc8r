const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// DATABASE
// subdocument
const openingTimeSchema = new mongoose.Schema({
    days:{
        type:String,
        required:true
    },
    opening:String,
    closing:String,
    closed:{
        type:Boolean,
        required:true
    }
});
// subdocument
const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type:Number,
        required:true,
        min:0,
        max:5
    },
    reviewText:String,
    createdOn:{
        type:Date,
        'default':Date.now
    }
});
// document
const locationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true},
    address:String,
    rating:{
        type:Number,
        'default': 0,
        min: 0,
        max: 5},
    facilities:[String],
    coods:{
        type:{ type: String },
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});
locationSchema.index({coords: '2dsphere'});

// Compiling a Model from a Schema
mongoose.model('Location', locationSchema);

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
        title: 'Starcups' ,
        pageHeader: {
            title:'Starcups',
        },
        sidebar:{
            context:'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction:"If you've been and you like it - or if you don't. But leave a review to help other people just like you."
        },
        location:{
            name:'Starcups',
            address:'125 High Street, Reading, RG6 1PS',
            rating:4,
            facilities:['Hot drinks','Food','Premium Wifi'],
            coords:'iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15936.768750392297!2d-60.02027928829196!3d-3.043106171570461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c1a1055f67251%3A0x9ae77ab416b67309!2sHappy%20Day%20Futebol%20Society!5e0!3m2!1spt-PT!2sbr!4v1587870062455!5m2!1spt-PT!2sbr" width="100%" height="270" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"',
            openingTimes: [{
                days: 'Monday- Friday',
                opening: '7:00am',
                closing:'7:00pm',
                closed: false
            },{
                days: 'Saturday',
                opening: '8:00am',
                closing:'5:00pm',
                closed: false
            },{
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            },{
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It\'s Okay!'
            }]
        }
    });
};

// GET 'Add review' page - ok
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