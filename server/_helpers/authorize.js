const expressJwt = require('express-jwt');
const { secret } = require('../config.json');

module.exports = authorize;

function authorize(roles = []) {
    if (roles === 'string') {
        roles = [roles];
    }
    return [
        expressJwt({ secret }),
        (req, res, next) => {


            if (roles.length && !roles.includes(req.user.role))
            //nguoi dung khong duoc cap quyen truy cap route
                return res.status(401).json({ message: 'Unauthorized' });

            next();
        }
    ];

}