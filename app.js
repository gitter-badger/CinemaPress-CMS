'use strict';

var config       = require('./config/config');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var express      = require('express');
var path         = require('path');
var app          = express();

var sitemap      = require(__dirname + '/routes/sitemap');
var categories   = require(__dirname + '/routes/categories');
var movie        = require(__dirname + '/routes/movie');
var index        = require(__dirname + '/routes/index');

var port = process.env.PORT || 3333;

app.set('views', path.join(__dirname, 'themes', config.theme, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'themes', config.theme, 'public')));

app.use('/' + config.urls.year, categories);
app.use('/' + config.urls.genre, categories);
app.use('/' + config.urls.country, categories);
app.use('/' + config.urls.actor, categories);
app.use('/' + config.urls.director, categories);
app.use('/' + config.urls.type, categories);
app.use('/' + config.urls.search, categories);
app.use('/' + config.urls.movie, movie);
app.use('/' + config.urls.sitemap, sitemap);
app.use('/', index);

app.use(function(req, res){

    res.status(404).send('Not found');

});

app.listen(port);