const express = require('express');
const router = express.Router();

// GET 'about' page
const about = (req, res) => {
    res.render('index', { title: 'About' });
};

module.exports = {
    about
};