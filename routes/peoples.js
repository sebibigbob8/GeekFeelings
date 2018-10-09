/**
 * TEST
 * @type {*|Mongoose}
 */
var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const People = require('../models/people')
let peopleModel = MONGOOSE.model('People',People.schema,'people'); //3eme args pck le nom n'est pas conventionnel

/* GET people listing. */
router.get('/', function(req, res, next) {
    let query = peopleModel.find({});
    query.exec(function (err,docs)
    {
        if (err)
        {
            console.warn("Could not get all peoples");
            next(err);
        }else{
            res.send(docs);
        }
    })
});
module.exports = router;