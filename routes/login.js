var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('', function(req, res, next) {
    User.findOne({username : req.body.username}).select("+password").exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.sendStatus(401);
        }
        console.log(user);
        bcrypt.compare(req.body.password, user.password, function(err, valid) {
            if (err) {
                return next(err);
            } else if (!valid) {
                return res.sendStatus(401);
            }
            // Login is valid...
            res.send(`Welcome ${user.name}!`);
        });
    })
});
module.exports = router;