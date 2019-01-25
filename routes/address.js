var express = require('express');
var router = express.Router();
const https = require('https');
//const config = require('../config/config');
const NodeGeocoder = require('node-geocoder');

/**
 * Google Map API geocode request
 * Give an address in request and get a position back
 */
router.get('/:address', async function (req, res, next) {
    if (typeof req.params.address === 'undefined')
        return next(new Error("No address"));
    var options = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: process.env.GOOGLE_KEY,
        formatter: null
    };
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(req.params.address)
        .then(function(data) {
            res.status(200).send(data);
        })
        .catch(function(err) {
            next(err);
        });
});
module.exports = router;