var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'hainx',
    password: 'hai12021998',
    database: 'demo2',
});

module.exports = connection;