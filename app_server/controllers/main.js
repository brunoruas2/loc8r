const express = require('express');
const router = express.Router();

// Controller da página index
const index = (req, res) => {
    res.render('index', { title: 'Express' });
};

module.exports = {
    index
};