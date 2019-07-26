const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const Illustration = require('../models/Illustration');
const authorize = require('../_helpers/authorize');
const formidable = require('formidable');
const multer = require('multer');
const path = require('path');

var fs = require('fs');

module.exports = route;
const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });


route.get('/:id?', function(req, res) {

    Illustration.getImgByNewId(req.params.id, function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);

        if (result != '') {
            res.setHeader('content-type', 'image/png');
            res.send(result[0].img);
        }
        res.send(404);

    })

});

route.post('/upload/:newsId?', function(req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var img = {
            img: fs.readFileSync(files.photo.path),
            newsId: req.params.newsId,
            content: 'asddd'

        }

        Illustration.addImg(img, function(err, count) {
            if (err) {
                throw err;
            }

            fs.unlinkSync(files.photo.path);

            res.json('OK');
        })
    })

});

route.delete('/:newsId?', authorize(roles.admin), function(req, res) {
    Illustration.remoteImg(req.params.newsId, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})