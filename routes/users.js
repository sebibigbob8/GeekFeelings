var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find().sort('name').exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
});
module.exports = router;