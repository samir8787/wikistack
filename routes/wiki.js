const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;

const router = express.Router();

router.get('/', function(request, response, next) {
    response.redirect('/')
});

        //urlTitle: request.body.title.replace(/[^\da-z\s]/ig, '').replace(/\s/g, '_'),

router.post('/', function(request, response, next) {
    console.log(request.body);
    let newPage = Page.build({
        title: request.body.title,
        content: request.body.content,
        status: request.body.status,
    });

    newPage.save().then(function() {
        response.redirect('/')
    }).catch(function(err) {
        console.error(err);
        response.status(500).render('error', {
            message: err.errors[0].message,
            error: {
                status: 500,
                stack: err.stack
            }
        });
    });
});

router.get('/add', function(request, response, next) {
    response.render('addpage');
});


module.exports = router;
