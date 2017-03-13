const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;

const router = express.Router();

router.get('/', function (request, response, next) {
  response.redirect('/')
});

router.post('/', function (request, response, next) {
  console.log(request.body);
  let newPage = Page.build({
    title: request.body.title,
    urlTitle: request.body.title.replace(' ', '_'),
    content: request.body.content,
    status: request.body.status,
  });

  newPage.save().then(function () {
    response.redirect('/')
  }).catch(function (err) {
    console.error(err);
     response.sendStatus(500);
  });
});

router.get('/add', function (request, response, next) {
  response.render('addpage');
});


module.exports = router;
