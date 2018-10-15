var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const User = require('../models/user');
let user = MONGOOSE.model('User',User.schema);
const ObjectId = MONGOOSE.Types.ObjectId;
/**
 * Get all users,Pagination depending of the amount of users and the client's needs
 * @api {get} /users Request all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiUse userJSON
 */
router.get('/', function(req, res, next) {
    let query = User.find({});
    User.find().count(function(err, total) {
        if (err) { return next(err); };
        let query = User.find();
        // Parse the "page" param (default to 1 if invalid)
        let page = parseInt(req.query.page, 10);
        if (isNaN(page) || page < 1) { page=1; }
        // Parse the "pageSize" param (default to 100 if invalid)
        let pageSize = parseInt(req.query.pageSize, 10);
        if (isNaN(pageSize) || pageSize < 0 || pageSize > 100) { pageSize=30; }
        // Apply skip and limit to select the correct page of elements
        query = query.skip((page - 1) * pageSize).limit(pageSize);
        query.exec(function (err,docs)
        {
            if (err)
            {
                next(err);
            }else{
                res.send({
                    page: page,
                    pageSize: pageSize,
                    total: total,
                    data: docs
                });
            }
        })
    });
});
/**
 * Get a user specified
 * @api {get} /users/:id Request a user's information
 * @apiName GetUser
 * @apiGroup User
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiDefine userJSON
 * @apiSuccess {String} name First name of the user
 * @apiSuccess {String} username username of the user
 * @apiSuccess {String} password password of the user
 * @apiSuccess {String} street street of the user's adress
 * @apiSuccess {String} streetNumber street's number of the user's adress
 * @apiSuccess {Number} npa npa number of the user's adress
 * @apiSuccess {String} city city of the user's adress
 * @apiSuccess {Date} birthDate date of birth of the user
 * @apiSuccess {String} description description of the user
 * @apiSuccess {Array} tag table of centers of interests
 */
router.get('/:id',loadUserById, function(req, res, next) {
    res.send(req.user);
});
/**
 * Modify an user
 * @api {patch} /users/:id Request a user's information
 * @apiName updateUser
 * @apiGroup User
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiUse userJSON
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
 * @api {post} /users Create a new user
 * @apiName createUser
 * @apiGroup User
 * 
 * @apiParam {String} name First name of the user
 * @apiParam {String} username username of the user
 * @apiParam {String} password password of the user
 * @apiParam {String} street street of the user's adress
 * @apiParam {String} streetNumber street's number of the user's adress
 * @apiParam {Number} npa npa number of the user's adress
 * @apiParam {String} city city of the user's adress
 * @apiParam {Date} birthDate date of birth of the user
 * @apiParam {String} description description of the user
 * @apiParam {Array} tag table of centers of interests
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
 * @api {delete} /users/:id Delete an existing user
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id Unique identifier of the user
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

    let query = user.findById(userId)

    query.exec(function(err, user) {
        if (err) {
            console.warn("Could not get the user");
            next(err); //Fait suivre le message d'erreur
        } else if (!user) {
            return userNotFound(res, userId);
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