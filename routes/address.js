var express = require('express');
var router = express.Router();
const https = require('https');
const config = require('../config/config');
const NodeGeocoder = require('node-geocoder');

/**
 * Google Map API geocode request
 * Give an address in request and get a position back
 */
router.get('/', async function (req, res, next) {
    //TODO: Comment gérer la hirarchie des routes
    let data ="";
    if (typeof req.body.address === 'undefined')
        return next(new Error("No address"));
    var options = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: config.googleKey,
        formatter: null
    };
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(req.body.address)
        .then(function(data) {
            res.status(200).send(data);
        })
        .catch(function(err) {
            next(err);
        });
});
module.exports = router;