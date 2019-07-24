const express = require('express');
const app = express();
const cors = require('cors')
const userControler = require('./controller/user-controler');
const bodyParser = require('body-parser');
const errorHandle = require('./_helpers/error-handles');

const Catalogs = require('./models/Catalog');
const News = require('./models/News');
const Comment = require('./models/Comment');
const Illustration = require('./models/Illustration');


News.createTable();
Catalogs.createTable();
Illustration.createTable();
Comment.createTable();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.use('/', require('./controller/user-controler'));
app.use('/admin/', require('./controller/catalog-controller'));
app.use('/news/', require('./controller/news-controller'));
app.use('/imgs/', require('./controller/img-controller'));
app.use(errorHandle);

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});