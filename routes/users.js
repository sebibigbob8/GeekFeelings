var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
let userModel = MONGOOSE.model('User',User.schema);
/* GET users listing. */
router.get('/', function(req, res, next) {
    /**
     * Get all users
     */
    let query = userModel.find({});
    query.exec(function (err,docs)
    {
        if (err)
        {
            console.warn("Could not get all users");
            next(err); //Fait suivre le message d'erreur
        }else{
            res.send(docs); //Renvoi des data
        }
    })

});
router.get('/:id', function(req, res, next) {
    /**
     * Get a user specified
     */
});
router.patch('/:id', function(req, res, next) {
    /**
     * Modify an user
     */
});
router.post('', function(req, res, next) {
    /**
     * Create an user
     */
});
router.delete('/:id', function(req, res, next) {
    /**
     * Delete an user
     */
});
module.exports = router;