const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;

const router = express.Router();

router.get('/', function (request, response, next) {
  User.findAll().then(function(users) {
    response.render('users', {users: users});
  });
});

router.get('/:id', function (request, response, next) {
  var id = request.params.id;
  var getUser = User.findOne({ where: {id: id }});
  var getPage = Page.findAll({ where: { authorId: id } })
  Promise.all([getUser, getPage]).then(function(promiseResults) {
    var user = promiseResults[0];
    var pages = promiseResults[1];
    response.render('userPage', { user: user, pages: pages });
  }).catch(function(err) {
    redirectToError(err, response);
  });
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
