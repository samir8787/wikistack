const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;

const router = express.Router();

router.get('/', function(request, response, next) {
    response.redirect('/')
});

router.post('/', function(request, response, next) {
    let newPage = Page.build({
        title: request.body.title,
        content: request.body.content,
        status: request.body.status,
    });

    newPage.save().then(function(page) {
        response.redirect(page.getRoute);
    }).catch(function(err) {
      redirectToError(err, response)
    });
});

router.get('/add', function(request, response, next) {
    response.render('addpage');
});

router.get('/:urlTitle', function (request, response, next) {
    let urlTitle = request.params.urlTitle;
    Page.findOne({
      where: {
        urlTitle: urlTitle
      }
    }).then(function (foundPage) {
      console.log(foundPage);
      let locals = {
        title: foundPage.title,
        urlTitle: foundPage.urlTitle,
        content: foundPage.content,
        authorName: 'Samir'
      };
      response.render('wikipage', locals)
    }).catch(function (err) {
      redirectToError(err, response)
    })


});

let redirectToError = function (err, response) {
  console.error(err);
  response.status(500).render('error', {
    message: err.errors[0].message,
    error: {
      status: 500,
      stack: err.stack
    }
  });
};


module.exports = router;
