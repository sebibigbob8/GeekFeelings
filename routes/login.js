var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'keykey-DoYouLoveMe';

/**
 * Sign in the API
 * @api {post} /login Try to connect with username and password
 * @apiName PostLogin
 * @apiGroup Login
 *
 * @apiParam {String} username Username of the user
 * @apiParam {String} password Password of the user
 *
 *@apiExample
 *     POST /users HTTP/1.1
 *     Content-Type: application/json
 *   {
 *       "username": "grigny91",
 *       "password":"password",
 *   }
 *
 *  @apiSuccessExample 201 OK
 *     HTTP/1.1 20 OK
 *     Content-Type: application/json
 *  {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmRmNjQwZTYxOTU0MzNhNDQwYjRhMWMiLCJleHAiOjE1NDE5NzE2MzYuNjg4LCJpYXQiOjE1NDEzNjY4MzZ9.-lomIo1zUb96JEa9I1NX8vVM0qLdpn3Xp2d_KDHnk_Q"
 *  }
 */
router.post('',function(req, res, next) {
    User.findOne({username : req.body.username}).select("+password").exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.sendStatus(401);
        }
        console.log('{$user} attempt login');
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
<<<<<<< HEAD
                res.send({ token: token, user: user }); // Send the token to the client.
=======
                res.send({ token: token,id: user._id }); // Send the token to the client.
>>>>>>> c4988db13ff5d320dbee560538196f42ce8489f6
            });
        });
    })
});
/**
 * Test the token
 * param req
 * param res
 * param next
 * @returns {*|void}
 */
function authenticate(req, res, next) {
    // Ensure the header is present.
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).send('Authorization header is missing');
    }
    // Check that the header has the correct format.
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(401).send('Authorization header is not a bearer token');
    }
    // Extract and verify the JWT.
    const token = match[1];
    jwt.verify(token, secretKey, function (err, payload) {
        if (err) {
            return res.status(401).send('Your token is invalid or has expired');
        } else {
            req.currentUserId = payload.sub;
            next(); // Pass the ID of the authenticated user to the next middleware.
        }
    });
}
module.exports = router;
module.exports.authenticate = authenticate;