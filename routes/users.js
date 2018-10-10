var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
let userModel = MONGOOSE.model('User',User.schema);
const ObjectId = MONGOOSE.Types.ObjectId;
/**
 * Get all users
 */
router.get('/', function(req, res, next) {
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
/**
 * Get a user specified
 */
router.get('/:id',loadUserById, function(req, res, next) {
    res.send(req.user);
});
/**
 * Modify an user
 */
router.patch('/:id', function(req, res, next) {

});
/**
 * Create an user
 */
router.post('', function(req, res, next) {

});
/**
 * Delete an user
 */
router.delete('/:id', function(req, res, next) {

});
/**
 * Load a user in the Request object depending of params given
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function loadUserById(req, res, next){
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return userNotFound(res, userId);
    }

    let query = userModel.findById(userId)

    query.exec(function(err, user) {
        if (err) {
            console.warn("Could not get the user");
            next(err); //Fait suivre le message d'erreur
        } else if (!user) {
            //TODO
            //return userNotFound(res, userId);
        }
        req.user = user;
        next();
    });
}
/**
 * Message in case of an "not found"
 * @param res
 * @param userId
 * @returns {*}
 */
function userNotFound(res, userId) {
    return res.status(404).type('text').send(`No user found with ID ${userId}`);
}
module.exports = router;