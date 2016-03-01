'use strict';

var getData      = require('../modules/getData');
var requiredData = require('../modules/requiredData');
var mergeData    = require('../modules/mergeData');
var config       = require('../config/config');
var express      = require('express');
var async        = require('async');
var router       = express.Router();

router.get('/', function(req, res) {

    var time = decodeURIComponent(req.originalUrl);
    console.time(time);
    
    switch (req.baseUrl) {
        case ('/' + config.urls.year):
            getCategories('year', function(render) {
                renderData(res, 'categories', render, time);
            });
            break;
        case ('/' + config.urls.genre):
            getCategories('genre', function(render) {
                renderData(res, 'categories', render, time);
            });
            break;
        case ('/' + config.urls.country):
            getCategories('country', function(render) {
                renderData(res, 'categories', render, time);
            });
            break;
        case ('/' + config.urls.actor):
            getCategories('actor', function(render) {
                renderData(res, 'categories', render, time);
            });
            break;
        case ('/' + config.urls.director):
            getCategories('director', function(render) {
                renderData(res, 'categories', render, time);
            });
            break;
        default:
            res.redirect('/');
    }

});

function getCategories(category, callback) {

    async.series({
            "categories": function (callback) {
                getData.categories(category, function(categories) {
                    callback(null, categories);
                });
            },
            "top": function (callback) {
                getData.top(function (movies) {
                    callback(null, movies);
                });
            }
        },
        function(err, result) {

            if (err) throw err;

            var required = requiredData.categories(category);

            var render = mergeData(result, required);

            callback(render);

        });

}

router.get('/:query/:page?', function(req, res) {

    var query = (req.query.q)
        ? req.query.q.replace(/[^A-zА-яЁё0-9 -]/g, '')
        : req.params.query.replace(/[^A-zА-яЁё0-9 -]/g, '');
    var sort = (req.query.sort)
        ? req.query.sort
        : config.sorting.default;
    var page = (req.params.page)
        ? parseInt(req.params.page)
        : 1;

    if (!query) return res.redirect('/');

    var time = decodeURIComponent(req.originalUrl);
    console.time(time);

    switch (req.baseUrl) {
        case ('/' + config.urls.year):
            getMovies({"year": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.genre):
            getMovies({"genre": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.country):
            getMovies({"country": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.actor):
            getMovies({"actor": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.director):
            getMovies({"director": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.type):
            getMovies({"type": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        case ('/' + config.urls.search):
            getMovies({"search": query}, sort, page, function(render) {
                renderData(res, 'category', render, time);
            });
            break;
        default:
            res.redirect('/');
    }

});

function getMovies(query, sort, page, callback) {

    async.series({
            "movies": function (callback) {
                getData.movies(query, sort, page, 'category', function (movies) {
                    callback(null, movies);
                });
            },
            "top": function (callback) {
                getData.movies(query, 'kinopoisk-rating-up', 1, 'top_category', function(movies) {
                    if (movies.length) {
                        callback(null, movies);
                    }
                    else {
                        getData.top(function (movies) {
                            callback(null, movies);
                        });
                    }
                });
            }
        },
        function(err, result) {

            if (err) console.error(err.message);

            var required = requiredData.category(query, sort, page, result.movies);
            var render = mergeData(result, required);

            callback(render);

        });

}

function renderData(res, type, render, time) {

    if (config.theme == 'skeleton') {
        res.json(render);
    }
    else {
        res.render(type, render);
    }

    console.timeEnd(time);

}

module.exports = router;
