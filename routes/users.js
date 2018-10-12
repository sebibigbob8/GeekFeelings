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
 * If the client do not
 */
router.patch('/:id',loadUserById,function(req, res, next) {
    if (req.body.street !== undefined) {
        req.user.street = req.body.street;
    }
    if (req.body.streetNumber !== undefined) {
        req.user.streetNumber = req.body.streetNumber;
    }
    if (req.body.npa !== undefined) {
        req.user.npa = req.body.npa;
    }
    if (req.body.city !== undefined) {
        req.user.city = req.body.city;
    }
    if (req.body.description !== undefined) {
        req.user.description = req.body.description;
    }

    req.user.save(function(err, savedUser) {
        if (err) {
            return next(err);
        }
        console.log(`Updated user "${savedUser.title}"`);
        res.send(savedUser);
    });
});
/**
 * Create an user
 */
router.post('', function(req, res, next) {
    new User(req.body).save(function(err, saveduser) {
        if (err) {
            return next(err);
        }
        console.log(`Created user "${saveduser}"`);
        res.status(201).send(saveduser);
    });
});
/**
 * Delete an user
 */
router.delete('/:id', loadUserById, function(req, res, next) {
    req.user.delete(function(err) {
        if (err) {
            return next(err);
        }
        console.log(`Deleted movie "${req.user.name}"`);
        res.sendStatus(204);
    });
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