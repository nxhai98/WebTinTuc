var db = require('../Database/Dbconnection');

var Catalogs = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo2') AND (TABLE_NAME = 'Catalogs')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Catalogs (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description TEXT, parentId INT, FOREIGN KEY (parentId) REFERENCES Catalogs(id) )", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

}

module.exports = Catalogs;