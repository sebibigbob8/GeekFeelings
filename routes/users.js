var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose').set('debug', true);
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ObjectId = MONGOOSE.Types.ObjectId;
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'keykey-DoYouLoveMe';
const login = require("./login");
const Picture = require('../models/picture');
const Rdv = require('../models/rdv');
/**
 * Get all users,Pagination depending of the amount of users and the client's needs
 * @api {get} /users Request all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiParam (URL query parameters) {number} [ageMin] Select only users older than it.
 * @apiParam (URL query parameters) {number} [ageMax] Select only users younger than it.
 * @apiUse userJSON
 *
 *  @apiExample Example
 *     GET /api/users?pageSize=2 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *   {
 *      "page": 1,
 *       "pageSize": 1,
 *       "total": 100,
 *       "data": [
 *           {
 *               "tag": [],
 *               "_id": "5bd025513b4861db3e59205f",
 *               "name": "Gerianne",
 *               "username": "gpengilly2",
 *               "gender": "female",
 *               "street": "Bonner",
 *               "streetNumber": "4",
 *               "npa": 9855,
 *               "city": "Santa Ignacia",
 *               "dateBirth": "1962-04-10T22:57:50.000Z",
 *               "description": "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
 *           },
 *           {
 *               "tag": [],
 *               "_id": "5bd025513b4861db3e592060",
 *               "name": "Brianna",
 *               "username": "bjeeves3",
 *               "gender": "other",
 *               "street": "Hansons",
 *               "streetNumber": "1",
 *               "npa": 1879,
 *               "city": "Chengxi",
 *               "dateBirth": "1971-09-18T15:23:43.000Z",
 *               "description": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat."
 *           }
 *       ]}
 */
router.get('/', function (req, res, next) {
    console.log("I try to do my job");
    User.find().count(function (err, total) {
        if (err) {
            return next(err);
        }

        let query = User.find();
        //Filters
        if (typeof req.query.gender !== 'undefined') {
            query = query.where('gender', req.query.gender);
        }
        if (typeof req.query.npa !== 'undefined') {
            query = query.where('npa', req.query.npa);
        }

        if (typeof req.query.ageMin !== 'undefined' && typeof req.query.ageMax !== 'undefined') {
            let today = new Date();
            let dateMin = new Date();
            let dateMax = new Date();
            dateMin.setFullYear(today.getFullYear() - req.query.ageMax);
            dateMax.setFullYear(today.getFullYear() - req.query.ageMin);
            query = query.where('dateBirth').gte(dateMin).where('dateBirth').lte(dateMax);
            console.log(dateMin.toISOString());
            console.log(dateMax.toISOString());
        }
        // Parse the "page" param (default to 1 if invalid)
        let page = parseInt(req.query.page, 10);
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        // Parse the "pageSize" param (default to 100 if invalid)
        let pageSize = parseInt(req.query.pageSize, 10);
        if (isNaN(pageSize) || pageSize < 0 || pageSize > 200) {
            pageSize = 30;
        }
        //Get usernames
        if (typeof req.query.allUsername !== 'undefined') {
            query = User.find().select('username');
        }
        // Apply skip and limit to select the correct page of elements
        query = query.skip((page - 1) * pageSize).limit(pageSize);
        query.exec(function (err, docs) {
            if (err) {
                next(err);
            } else {
                //TODO : Bug pour postman ??
                res.status(200).send({
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
 * Verify the unicity
 */
router.get('/unique/:username', function (req, res, next) {
    let username = req.params.username;
    let query = User.find().where('username', username);
    let response;
    query.exec(function (err, users) {
        if (err) {
            next(err);
        } else if (users.length > 0)
            response = `{"Result" : false}`;
        else
            response = `{"Result" : true}`;


        res.send(JSON.parse(response));

    });

});
router.get('/unique', function (req, res, next) {
    query = User.find().select('username');
    query.exec(function (err, users) {
        if (err) {
            next(err);
        } else
            response = `{"data" : ${users}`;

        res.send(users);
    });
});
/**
 * Get a user specified
 * @api {get} /users/:id Request a user's information
 * @apiName GetUser
 * @apiGroup User
 * @apiParam {Number} id Unique identifier of the user
 * @apiParam {Boolean} define this parameter return the number of pictures of the user
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
 *
 * @apiExample Example
 * GET /api/users/5bd025513b4861db3e592062 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *   {
 *       "tag": [],
 *       "_id": "5bd025513b4861db3e59205f",
 *       "name": "Gerianne",
 *       "username": "gpengilly2",
 *       "gender": "female",
 *       "street": "Bonner",
 *       "streetNumber": "4",
 *       "npa": 9855,
 *       "city": "Santa Ignacia",
 *       "dateBirth": "1962-04-10T22:57:50.000Z",
 *       "description": "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
 *   }
 */
router.get('/:id', loadUserById, function (req, res, next) {
    if (typeof req.query.nbPicture == 'undefined') {
        res.status(200).send(req.user);
    } else {
        let query = User.find();
        query.exec(function (err, users) {
            if (err) {
                next(err);
            } else if (!users) {
                return userNotFound(res, userId);
            }
            const userIds = users.map(userss => userss._id);

            Picture.aggregate([
                {
                    $match: { // Select movies directed by the people we are interested in
                        user: {$in: userIds}
                    }
                },
                {
                    $group: { // Group the documents by director ID
                        _id: req.params.id,
                        picturesCount: { // Count the number of movies for that ID
                            $sum: 1
                        }
                    }
                }
            ], function (err, results) {
                if (err)
                    next(err);

                results.find(function (item, i) {
                    const count = item.picturesCount;
                    req.user.count = count;
                });
                res.status(200).send("" + req.user.count);

            });
        });
    }
});
router.get('/:id/picture', loadUserById, getMyPictures, function (req, res, next) {
    res.status(200).send(req.picture);
});

router.get('/:id/rdv', loadUserById, getMyRdvs, function (req, res, next) {
    res.status(200).send(req.rdv);
});



/**
 * Modify an user
 * @api {patch} /users/:id Request a user's information
 * @apiName updateUser
 * @apiGroup User
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiUse userJSON
 *
 * @apiExample Example
 *     PATCH /users/58b2926f5e1def0123e97281 HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "description": "NEW MICHEAL JACKSON"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *   {
 *       "tag": [],
 *       "_id": "58b2926f5e1def0123e97281",
 *       "name": "Gerianne",
 *       "username": "gpengilly2",
 *       "gender": "female",
 *       "street": "Bonner",
 *       "streetNumber": "4",
 *       "npa": 9855,
 *       "city": "Santa Ignacia",
 *       "dateBirth": "1962-04-10T22:57:50.000Z",
 *       "description": "NEW MICHEAL JACKSON"
 *   }
 */
//TODO : Check the correct user and manage asyncrone
router.patch('/:id', login.authenticate, loadUserById, function (req, res, next) {
    let query = User;
    if (typeof req.query.username !== 'undefined') {
        /* query = User.findById(req.currentUserId);
         query.exec(function (err, theUser) {
             if (err) {
                 next(err);
             }
             console.log("User Patch : " + theUser.username);
             if (req.query.username !== theUser.username)
                 return res.status(403).send('Please mind your own things.');
         });*/
    } else if (req.currentUserId !== req.params.id) {
        console.log(req.currentUserId + " =? " + req.params.id);
        return res.status(403).send('Please mind your own things.')
    }

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

    if (req.body.dateBirth !== undefined) {
        req.user.dateBirth = req.body.dateBirth;
    }
    if (req.body.tag !== undefined) {
        req.user.tag = req.body.tag;
    }

    req.user.save(function (err, savedUser) {
        if (err) {
            return next(err);
        }
        console.log(`Updated user ${savedUser}`);
        res.status(200).send(savedUser);//TODO: how to send this in JSON ->`{"newDescription":"${savedUser.description}","newTags":${savedUser.tag}}`
    });
});
/**
 * Create an user
 * Use of Bcrypt to protect the password
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
 *
 *@apiExample
 *     POST /users HTTP/1.1
 *     Content-Type: application/json
 *   {
 *       *"tag": ["Patinage","pole dance"],
 *       "name": "Niska",
 *       "username": "grigny91",
 *       "password":"password",
 *       "gender": "other",
 *       *"street": "eqwer",
 *       *"streetNumber": "4",
 *       *"npa": 9855,
 *       "city": "Santa monica",
 *       "dateBirth": "1991-04-10T22:57:50.000Z",
 *       *"description": "W.L.G"
 *   }
 *
 *  @apiSuccessExample 201 OK
 *     HTTP/1.1 201 OK
 *     Content-Type: application/json
 *  {
 *      grigny91 Successfully created
 *  }
 */
router.post('', function (req, res, next) {
    const plainPassword = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        req.body.password = hashedPassword;
        req.body.description = "";
        req.body.tag = [];
        new User(req.body).save(function (err, saveduser) {
            if (err) {
                return next(err);
            }
            console.log(`Created user "${saveduser}"`);
            res.status(201).send({
                status: 'Successfully created',
                username: saveduser.username
            });
        });
    });
});
/**
 * Delete an user
 * @api {delete} /users/:id Delete an existing user
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiExample Example
 *     DELETE /users/5bd025513b4861db3e592062 HTTP/1.1
 *
 * @apiSuccessExample 204 No Content
 *     HTTP/1.1 204 No Content
 *
 */
router.delete('/:id', login.authenticate, loadUserById, function (req, res, next) {
    let currentUser = User.findOne({username: req.body.username}).select("+password").exec(function (err, user) {
        if (err)
            next(err);
        if (currentUser.username !== "admin") {
            res.status(403).send("Contact an admin");
        } else {
            req.user.delete(function (err) {
                if (err) {
                    return next(err);
                }
                console.log(`Deleted user "${req.user.name}"`);
                res.sendStatus(204);
            });
        }
    });


});

/**
 * Load a user in the Request object depending of params given, UPDATE : can be the username too
 * param req
 * param res
 * param next
 */
//TODO: correct async code. how to properly declare query between the 2 exec functions ? Use findOne instead of find

async function loadUserById(req, res, next) {
    let userId = req.params.id;
    let query = "";
    if (typeof req.query.username !== 'undefined') {
        let queryId = User.find().where('username', userId);
        await queryId.exec(function (err, id) {
            if (err) {
                next(err);
            }
            userId = id[0]._id;
            req.params.id = userId;
            query = User.findById(userId);
            query.exec(function (err, user) {
                if (err) {
                    next(err);
                } else if (!user) {
                    return userNotFound(res, userId);
                }
                req.user = user;
                console.log('loadUserById :' + req.user);
                next();
            });
        })
    } else if (!ObjectId.isValid(userId)) {
        return userNotFound(res, userId);
    } else {
        query = User.findById(userId);
        query.exec(function (err, user) {
            if (err) {
                next(err);
            } else if (!user) {
                return userNotFound(res, userId);
            }
            req.user = user;
            console.log('loadUserById :' + req.user);
            next();
        });
    }
}

/**
 * Message in case of an "not found"
 * param res
 * param userId
 */
function userNotFound(res, userId) {
    return res.status(404).type('text').send(`No user found with ID ${userId}`);
}

/**
 *Get all pictures of the user
 *
 * param req
 * param res
 * param next
 */
function getMyPictures(req, res, next) {
    let query = Picture.find({"user": req.params.id});
    query.exec(function (err, pictures) {
        if (err) {
            next(err);
        }
        req.picture = pictures;
        next();
    });
}

function getMyRdvs(req, res, next) {
    let query = Rdv.find({"creator": req.params.id});
    query.exec(function (err, rdvs) {
        if (err) {
            next(err);
        }
        req.rdv = rdvs;
        next();
    });
}
module.exports = router;