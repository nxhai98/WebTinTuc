const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/roles');
const Users = require('../models/User');


Users.createTable();

module.exports = {
    authenticate,
}

async function authenticate({ userName, passwd }, user) {
    console.log(user);

    if (user.password == passwd) {
        token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        console.log(token);
        const { password, ...userPublicInfo } = user; // tach passdw ra khoi tuong thong tin
        console.log(userPublicInfo);
        return {...userPublicInfo, token };
    }

}