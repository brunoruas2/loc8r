const express = require('express');
const router = express.Router();

// GET 'about' page - ok
const about = (req, res) => {
    res.render('generic-text', { title: 'About' });
};

module.exports = {
    about
};