const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const authorize = require('../_helpers/authorize');
const Comment = require('../models/Comment');

module.exports = route;

route.get('/news/:idNews?/comment', function(req, res, next) {
    Comment.getComments(req.params.idNews, function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })
});

route.get('/comments/:id?', function(req, res, next) {
    Comment.getChildComments(req.params.id, function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })
})

route.post('/comments/', authorize(roles.admin, roles.user), function(req, res, next) {
    Comment.addComment(req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})

route.delete('/comments/')