const express = require('express');
const app = express();
const cors = require('cors')
const userControler = require('./controller/user-controler');
const bodyParser = require('body-parser');
const errorHandle = require('./_helpers/error-handles');

const Catalogs = require('./models/Catalog');
Catalogs.createTable();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/', require('./controller/user-controler'));
app.use('/admin/', require('./controller/catalog-controller'));
app.use(errorHandle);

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});