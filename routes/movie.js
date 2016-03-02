'use strict';

var getData      = require('../modules/getData');
var requiredData = require('../modules/requiredData');
var mergeData    = require('../modules/mergeData');
var config       = require('../config/config');
var express      = require('express');
var async        = require('async');
var router       = express.Router();

router.get('/:movie/:type?', function(req, res) {

    var time = decodeURIComponent(req.originalUrl);
    console.time(time);

    req.params.movie = '/' + req.params.movie || '';
    req.params.type  = req.params.type || 'single';

    config.urls.prefix_id = config.urls.prefix_id || '/';

    var regexpId   = new RegExp(decodeURIComponent(config.urls.prefix_id) + '([0-9]{1,7})', 'ig');
    var id         = regexpId.exec(req.params.movie); id = (id) ? id[1] : '';
    var regexpType = new RegExp('(single|online|trailer|download|picture)', 'ig');
    var type       = regexpType.exec(req.params.type); type = (type) ? type[1] : 'single';

    if (!id) return res.status(404).send('Not found');

    var related = {};

    async.series({
            "movie": function (callback) {
                getData.movie(id, function (movie) {
                    related = movie;
                    callback(null, movie);
                });
            },
            "top": function (callback) {
                getData.top(function (movies) {
                    callback(null, movies);
                });
            },
            "movies": function(callback) {
                async.series({
                        "countries": function(callback) {
                            if (related.countries && config.related.indexOf('countries')+1) {
                                getData.related('country', related.countries, 'kinopoisk-vote-up', function (movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "genres": function(callback) {
                            if (related.genres && config.related.indexOf('genres')+1) {
                                getData.related('genre', related.genres, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "directors": function(callback) {
                            if (related.directors && config.related.indexOf('directors')+1) {
                                getData.related('director', related.directors, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "actors": function(callback) {
                            if (related.actors && config.related.indexOf('actors')+1) {
                                getData.related('actor', related.actors, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "country": function(callback) {
                            if (related.country && config.related.indexOf('country')+1) {
                                getData.related('country', related.country, 'kinopoisk-vote-up', function (movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "genre": function(callback) {
                            if (related.genre && config.related.indexOf('genre')+1) {
                                getData.related('genre', related.genre, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "director": function(callback) {
                            if (related.director && config.related.indexOf('directors')+1) {
                                getData.related('director', related.director, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "actor": function(callback) {
                            if (related.actor && config.related.indexOf('actors')+1) {
                                getData.related('actor', related.actor, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        },
                        "year": function(callback) {
                            if (related.year && config.related.indexOf('year')+1) {
                                getData.related('year', related.year, 'kinopoisk-vote-up', function(movies) {
                                    callback(null, movies);
                                });
                            }
                            else {
                                callback(null, []);
                            }
                        }
                },
                function(err, result) {

                    if (err) console.error(err.message);

                    callback(null, result);

                });
            }
        },
        function(err, result) {

            if (err) console.error(err.message);

            var required = requiredData.movie(type, result.movie, result.movies);
            var render = mergeData(result, required);

            renderData(res, type, render, time);

        });
});

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