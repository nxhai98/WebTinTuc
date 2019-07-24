const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const Catalogs = require('../models/Catalog');
const authorize = require('../_helpers/authorize');

module.exports = route;

route.get('/catalogs/', authorize(), function(req, res, next) {
    console.log('aaa');

})