const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const Illustration = require('../models/Illustration');
const authorize = require('../_helpers/authorize');

module.exports = route;

route.get('/:id?', function(req, res) {

});

route.post('/', authorize(roles.admin), function(req, res, next) {
    console.log(req.body);

})