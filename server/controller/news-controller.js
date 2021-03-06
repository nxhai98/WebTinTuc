const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const News = require('../models/News');
const Illustration = require('../models/Illustration')
const authorize = require('../_helpers/authorize');


module.exports = route;

route.get('/page/:page?', function(req, res, next) {
    if (req.params.page) {
        News.getNews(req.params.page, function(err, news) {
            if (err) {
                throw err;
            }
            res.json(news);
        })
    } else {
        News.getNumberOfNews(function(err, num) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(num[0].Sum / 2));
        })
    }

});

route.get('/catalog/:id?/page/:page?', function(req, res) {
    if (req.params.id && req.params.page) {
        News.getNewByCatalog(req.params.id, req.params.page, function(err, list) {
            if (err) {
                throw err;
            }
            res.json(list);
        })
    } else if (req.params.id) {
        News.getNewCountByCatalog(req.params.id, function(err, count) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(count[0].Sum / 2))
        })
    }

});

route.get('/id/:id?', function(req, res, next) {
    News.getById(req.params.id, function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    })
});

route.post('/', authorize(roles.admin), function(req, res, next) {
    News.addNews(req.body, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log(results.insertId);
        res.json(results.insertId);


    });
});

route.delete('/id/:id?', authorize(roles.admin), function(req, res, next) {
    Illustration.remoteImg(req.params.id, function(err, count) {
        if (err) {
            throw err;
        }
        News.remoteNews(req.params.id, function(err, count) {
            if (err) {
                throw err;
            }
            res.json(count);
        })
    })
});

route.put('/id/:id?', authorize(roles.admin), function(req, res, next) {
    News.updateNews(req.params.id, req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})