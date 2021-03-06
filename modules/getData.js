'use strict';

var config        = require('../config/config');
var structureData = require('./structureData');
var requiredData  = require('./requiredData');
var pool          = require('./sphinx');
var async         = require('async');
var Memcached     = require('memcached');
var md5           = require('md5');

var memcached = new Memcached('localhost:11211');

function getCategories(category, callback) {

    var queryString = '' +
        'SELECT ' + category + ' AS category ' +
        'FROM best_movies ' +
        'WHERE MATCH(\'@all_movies _all_ @' + category + ' !_empty\') ' +
        'ORDER BY kp_vote DESC ' +
        'LIMIT 10000 ' +
        'OPTION max_matches = 10000';

    var queryHash = md5(queryString);

    memcached.get(queryHash, function (err, categories) {

        if (err) throw err;

        if (categories) {

            callback(categories);

        }
        else {

            pool.getConnection(function(err, connection) {

                connection.query(queryString, function (err, movies) {

                    if (err) throw err;
                    connection.release();

                    var categories = structureData.categories(movies);

                    callback(categories);

                    memcached.set(
                        queryHash,
                        categories,
                        config.cache,
                        function (err) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );

                });
            });
        }
    });

}

function getMovies(query, sort, page, type, callback) {

    var limit = config.counts[type];
    var start = page * config.counts[type] - config.counts[type];
    var max   = start + limit;

    var queryString = '' +
        'SELECT * ' +
        'FROM movies ' +
        'WHERE ' + createQuery(query, sort) + ' ' +
        'ORDER BY ' + orderBy(sort) + ' ' +
        'LIMIT ' + start + ', ' + limit + ' ' +
        'OPTION max_matches = ' + max;

    var queryHash = md5(queryString);

    memcached.get(queryHash, function (err, movies) {

        if (err) throw err;

        if (movies) {

            callback(movies);

        }
        else {

            pool.getConnection(function(err, connection) {

                connection.query(queryString, function (err, movies) {

                    if (err) throw err;
                    connection.release();

                    movies = structureData.movies(movies);

                    callback(movies);

                    memcached.set(
                        queryHash,
                        movies,
                        config.cache,
                        function (err) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );

                });
            });
        }
    });

}

function getMovie(id, callback) {

    var queryString = 'SELECT * FROM movies WHERE kp_id = ' + id + ' LIMIT 1';

    var queryHash = md5(queryString);

    memcached.get(queryHash, function (err, movie) {

        if (err) throw err;

        if (movie) {

            callback(movie);

        }
        else {

            pool.getConnection(function(err, connection) {

                connection.query(queryString, function (err, movies) {

                    if (err) throw err;
                    connection.release();

                    movie = structureData.movies(movies)[0];

                    callback(movie);

                    memcached.set(
                        queryHash,
                        movie,
                        config.cache,
                        function (err) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                });
            });
        }

    });

}

function getRelatedMovies(attribute, categories, sort, callback) {

    var m = [];

    categories = ('' + categories).split(',');

    async.forEachOfSeries(categories, function (category, key, callback) {

        var query = {};
        query[attribute] = category;

        getMovies(query, sort, 1, 'related', function(movies) {

            if (movies.length) {
                m.push(requiredData.related(query, movies));
            }

            callback(null);

        });

    }, function (err) {

        if (err) console.error(err.message);

        callback(m);

    });

}

function getTopMovies(callback) {

    var m = [];

    async.forEachOfSeries(config.top, function (id, key, callback) {

        getMovie(id, function(movie) {

            m.push(movie);

            callback(null);

        });

    }, function (err) {

        if (err) console.error(err.message);

        callback(m);

    });

}

function createQuery(query, sort) {

    var where = [];
    var match = [];

    match.push('');

    if (sort.indexOf('kinopoisk-rating') + 1) {
        where.push('`kp_vote` > 2000');
    }
    else if (sort.indexOf('imdb-rating') + 1) {
        where.push('`imdb_vote` > 2000');
    }
    else if (sort.indexOf('year') + 1 || sort.indexOf('premiere') + 1) {
        where.push('`premiere` <= ' + toDays());
        where.push('`title_ru` != \'\'');
    }

    for (var attribute in query) {
        if (query.hasOwnProperty(attribute)) {

            if (attribute == 'type') {
                if (query[attribute].toLowerCase().indexOf("сериалы") + 1) {
                    where.push('`type` = 1');
                    match.push('@all_movies _all_ @genre !аниме !короткометражка');
                }
                else if (query[attribute].toLowerCase().indexOf("мультфильмы") + 1) {
                    where.push('`type` != 1');
                    match.push('@genre мультфильм | детский !аниме !короткометражка');
                }
                else if (query[attribute].toLowerCase().indexOf("аниме") + 1) {
                    match.push('@genre аниме');
                }
                else if (query[attribute].toLowerCase().indexOf("тв-передачи") + 1) {
                    match.push('@genre ток-шоу | новости | реальное | церемония | концерт');
                }
                else if (query[attribute].toLowerCase().indexOf("фильмы") + 1) {
                    where.push('`type` != 1');
                    match.push('@all_movies _all_ @genre !мультфильм');
                }
            }
            else {
                match.push('@' + attribute + ' ' + query[attribute]);
            }

        }
    }

    where.push('MATCH(\'' + match.join(' ').trim() + '\')');

    return where.join(' AND ');

}

function orderBy(sort) {

    var ob;

    switch (sort) {
        case ('kinopoisk-rating-up'):
            ob = 'kp_rating DESC';
            break;
        case ('kinopoisk-rating-down'):
            ob = 'kp_rating ASC';
            break;
        case ('imdb-rating-up'):
            ob = 'imdb_rating DESC';
            break;
        case ('imdb-rating-down'):
            ob = 'imdb_rating ASC';
            break;
        case ('kinopoisk-vote-up'):
            ob = 'kp_vote DESC';
            break;
        case ('kinopoisk-vote-down'):
            ob = 'kp_vote ASC';
            break;
        case ('imdb-vote-up'):
            ob = 'imdb_vote DESC';
            break;
        case ('imdb-vote-down'):
            ob = 'imdb_vote ASC';
            break;
        case ('year-up'):
            ob = 'year DESC';
            break;
        case ('year-down'):
            ob = 'year ASC';
            break;
        case ('premiere-up'):
            ob = 'premiere DESC';
            break;
        case ('premiere-down'):
            ob = 'premiere ASC';
            break;
        default:
            ob = 'kp_vote DESC';
            break;
    }

    return ob;

}

function toDays() {
    return 719527 + Math.floor(new Date().getTime()/(1000*60*60*24));
}

module.exports = {
    "categories" : getCategories,
    "movies"     : getMovies,
    "movie"      : getMovie,
    "related"    : getRelatedMovies,
    "top"        : getTopMovies
};