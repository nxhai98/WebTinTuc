var db = require('../Database/Dbconnection');


var News = {
    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo2') AND (TABLE_NAME = 'News')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE News (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), catalogId INT, description TEXT, author INT, createAt DATETIME, updateAt DATETIME, content TEXT, FOREIGN KEY (catalogId) REFERENCES Catalogs(id))", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },


    getNews: function(page, callback) {
        return db.query("SELECT id, title, description, catalogId, author, createAt, updateAt FROM News LIMIT ?, 50", [page - 1], callback);
    },

    getById: function(id, callback) {
        return db.query("SELECT * FROM News WHERE id = ? ", id, callback);
    },

    addNews: function(news, callback) {
        return db.query("INSERT INTO News(title, description, catalogId, author, createAt, content) VALUE(?, ?, ?, ?, NOW(), ?)", [news.title, news.description, news.catalogId, news.author, news.content], callback);
    },

    updateNews(id, news, callback) {
        return db.query("UPDATE News SET title = ?, catalogId = ?, description = ?, author = ?, updateAt = NOW(), content = ? WHERE id = ?", [news.title, news.catalogId, news.description, news.author, news.content, id], callback);
    },

    remoteNews: function(id, callback) {
        return db.query("DELETE FROM News WHERE id = ?", [id], callback);
    }



}

module.exports = News;