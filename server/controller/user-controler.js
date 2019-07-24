const express = require('express');
const route = express.Router();
const userService = require('../Services/user-sevices');
const roles = require('../_helpers/roles');
const Users = require('../models/User');
const authorize = require('../_helpers/authorize');


module.exports = route;
route.post('/login/', authenticate);
route.get('/admin/users/', authorize(roles.admin), getListUser);
route.post('/admin/users/', authorize(roles.admin), addUsers);
route.delete('/admin/users/:id?', authorize(roles.admin), deleteUser);
route.put('/admin/users/:id?', authorize(roles.admin), updateUser);

function authenticate(req, res, next) {
    Users.getUserByUserName(req.body.userName, function(err, resUser) {
        if (err) {
            throw err;
        }
        userService.authenticate(req.body, resUser[0])
            .then(user => {
                console.log(user);

                user ? res.json(user) : res.status(401).json({ message: 'Invalid Username or Passwd' })
            })
            .catch(err => next(err));

    })


}

function getListUser(req, res, next) {
    Users.getUsers(1, function(err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    })
}

function addUsers(req, res, next) {
    Users.addUsers(req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json();
    })
}

function deleteUser(req, res, next) {
    Users.remoteUser(req.params.id, function(err, count) {
        if (err) { throw err };
        res.json();
    })
}

function updateUser(req, res, next) {
    Users.updateUser(req.params.id, req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
}