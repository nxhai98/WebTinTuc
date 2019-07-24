var db = require('../Database/Dbconnection');


var Users = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo2') AND (TABLE_NAME = 'Users')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Users (id INT AUTO_INCREMENT PRIMARY KEY, userName VARCHAR(255), password VARCHAR(1024), role VARCHAR(255), email VARCHAR(255), fullName VARCHAR(255), gender VARCHAR(255))", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

    getUsers: function(page, callback) {
        return db.query("SELECT id, userName, role, email, fullName, gender FROM Users LIMIT ?, 50", [page - 1], callback);
    },

    getUserByUserName: function(userName, callback) {
        return db.query("SELECT * FROM Users WHERE userName = ? ", userName, callback);
    },

    addUsers: function(user, callback) {
        return db.query("INSERT INTO Users(userName, password, role, email, fullName, gender) VALUE(?, ?, ?, ?, ?, ?)", [user.userName, user.password, user.role, user.email, user.fullName, user.gender], callback);
    },

    updateUser(id, user, callback) {
        return db.query("UPDATE Users SET userName = ?, email = ?, fullName = ?, gender = ? WHERE id = ?", [user.userName, user.email, user.fullName, user.gender, id], callback);
    },

    remoteUser: function(id, callback) {
        return db.query("DELETE FROM Users WHERE id = ?", [id], callback);
    }


}


module.exports = Users;