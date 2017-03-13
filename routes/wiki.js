const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;

const router = express.Router();

router.get('/', function(request, response, next) {
  Page.findAll().then(function(pages) {
    response.render('index', {pages: pages});
  }).catch(function(err) {
    redirectToError(err, response);
  });
});

router.post('/', function(request, response, next) {
  // User.findOrCreate({
  //   where: {email: req.body.authorEmail},
  //   defaults: {name: req.body.authorName}
  // })
  //   .then(function (data) {
  //     console.log(data);
  //     let newPage = Page.build({
  //       title: request.body.title,
  //       content: request.body.content,
  //       status: request.body.status,
  //     });
  //
  //     return newPage.save()
  //   })
  //   .then(function (page) {
  //     response.redirect(page.getRoute);
  //   })
  //   .catch(function (err) {
  //     redirectToError(err, response);
  //   });

  User.findOrCreate({
    where: {email: request.body.authorEmail},
    defaults: {name: request.body.authorName}
  })
    .then(function (user) {
      return Page.create({
        title: request.body.title,
        content: request.body.content,
        status: request.body.status,
        authorId: user[0].id
      })
    })
    .then(function (page) {
      response.redirect(page.getRoute);
    })
    .catch(function (err) {
      redirectToError(err, response);
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
      console.log('GET', foundPage);
      let locals = {
        title: foundPage.title,
        urlTitle: foundPage.urlTitle,
        content: foundPage.content,
        authorName: 'Samir'
      };
      response.render('wikipage', locals);
    }).catch(function (err) {
      redirectToError(err, response);
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
