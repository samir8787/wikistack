const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const db = require('./models');
const routes = require('./routes/wiki.js');
const userRoutes = require('./routes/users.js');


const app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

 let env = nunjucks.configure('views', { noCache: true });
 let AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);
 env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

// logging middleware
app.use(logger('tiny'));
app.use(express.static('public'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/wiki/', routes);
app.use('/users/', userRoutes);

app.get('/', function (request, response, next) {
    response.redirect('/wiki/');
});

db.db.sync()
  .then(function () {
      app.listen(3000, function() {
      console.log('Server has started!');
    });
  })
  .catch(function (err) {
    console.error(err)
  });
