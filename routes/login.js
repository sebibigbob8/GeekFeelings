var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'keykey-DoYouLoveMe';

/**
 * Sign in to the API
 * @api {post} /login Try to connect with username and password
 * @apiName PostLogin
 * @apiGroup Login
 */
router.post('',function(req, res, next) {
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
            const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
            const claims = { sub: user._id.toString(), exp: exp };
            jwt.sign(claims, secretKey, function(err, token) {
                if (err) { return next(err); }
                res.send({ token: token }); // Send the token to the client.
            });
        });
    })
});
module.exports = router;