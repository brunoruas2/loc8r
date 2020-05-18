const express = require('express');
const router = express.Router();
const request = require('request');

// GET 'about' page - ok
const about = (req, res) => {
    res.render('generic-text', {
        title: 'About Loc8r',
        content:'Loc8r was created to help people find places to sit down and get a bit of work done.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin imperdiet venenatis. Nam et mattis quam. Nulla vulputate feugiat massa sed scelerisque. Etiam ac congue mauris,  rhoncus mattis nibh. Sed egestas a sem sit amet placerat. Cras porttitor, quam in faucibus dignissim, arcu nisl laoreet lectus, nec dignissim felis justo quis sapien. Fusce mattis, odio vel semper viverra, mi enim semper ante, non consequat tellus sapien vel metus. Donec ut vulputate quam. Etiam fringilla lacus in quam molestie auctor. Nullam a elit at mauris malesuada sagittis non non odio. Nam at  neque mauris. Duis non leo consequat, condimentum quam a, finibus nisi. In hac habitasse platea dictumst. Maecenas sit amet pretium turpis. Sed congue pretium felis sit amet pretium. Maecenas et egestas sem, id aliquet augue. Maecenas  hendrerit nisl id sem varius, in aliquam ligula lobortis. Fusce ornare ut lectus porta venenatis. Morbi a arcu vitae purus congue pellentesque. Integer tempor blandit nisi eu tempor. Suspendisse  varius id nisi at volutpat. Sed tempor sed massa sed rhoncus. Donec semper ligula eget semper tincidunt. Sed condimentum malesuada gravida. Quisque sed condimentum est, vel rutrum justo. Sed viverra leo id varius blandit.'
    });
};

module.exports = {
    about
};