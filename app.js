const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const db = require('./models');

var app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

nunjucks.configure('views', { noCache: true });

app.use(logger('tiny'));
app.use(express.static('public'));

const server = app.listen(3000, function() {
  console.log('Server has started!');
});
