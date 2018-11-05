var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const Rdv = require('../models/rdv');
const ObjectId = MONGOOSE.Types.ObjectId;


/**
 * @api {get} /api/rdvs List rdvs
 * @apiName RetrieveRdv
 * @apiGroup Rdv
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a paginated list of rdvs with specified parameters
 *
 *
 * @apiParam (URL query parameters) {String} [creator] Select only rdvs generated by specified creator
 * @apiParam (URL query parameters) {String} [city] Select only rdvs occuring in a specified city
 * @apiParam (URL query parameters) {String} [category] Select only rdvs related to a specified category

 * @apiExample Example
 *     GET /api/rdv?city=Genève
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *       {
 *        "deleted": false,
 *        "_id": "5bd6d72bc4158f805389e41e",
 *        "city": "Genève",
 *        "street": "1111",
 *        "npa": "1280",
 *        "streetNumber": 12,
 *        "purposeTitle": "Partie de Magic",
 *        "description": "Cherche un geek chaud à se faire une partie au calme",
 *        "category": "Magic",
 *        "__v": 0
 *
 *       },
 *        {
 *        "deleted": false,
 *        "_id": "5bd7004fa2ef18819d44226e",
 *        "creator": "Jean",
 *        "guest": "Jeanne",
 *        "city": "Genève",
 *        "street": "Route de Penthalaz",
 *        "npa": "1280",
 *        "streetNumber": 12,
 *        "purposeTitle": "Repas",
 *        "description": "Un rendez-vous galant",
 *        "category": "Restaurant",
 *        "__v": 0
 *       }
 */
router.get('/', function(req, res, next) {
    let query = Rdv.find();
    if (typeof req.query.city !== 'undefined') {
        query = query.where('city', req.query.city);
    }
    if (typeof req.query.category !== 'undefined') {
        query = query.where('category', req.query.category);
    }
    if (typeof req.query.creator !== 'undefined') {
        query = query.where('creator', req.query.creator);
    }
    query.exec(function (err,docs){
        if (err)  {
            console.warn("Could not get all rdvs");
            next(err);
        }
        else{
            res.send(docs);
        }
    });
});

 /**
 * Get a specified rdv
 * @api {get} /api/rdvs/:id Get a rdv by ID
 * @apiName RetrieveRdv
 * @apiGroup Rdv
 * @apiVersion 1.0.0
 * @apiDescription Retrieve one rdv by ID
 *
 *
 * @apiExample Example
 *     GET /api/rdvs/5bd7004fa2ef18819d44226e HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *       {
 *        "deleted": false,
 *        "_id": "5bd7004fa2ef18819d44226e",
 *        "creator": "Jean",
 *        "guest": "Jeanne",
 *        "city": "Genève",
 *        "street": "Route de Penthalaz",
 *        "npa": "1280",
 *        "streetNumber": 12,
 *        "purposeTitle": "Repas",
 *        "description": "Un rendez-vous galant",
 *        "category": "Restaurant",
 *        "__v": 0
 *       }
 */
router.get('/:id',loadRdvById, function(req, res, next) {
    let query = Rdv.find({});
    query.exec(function (err,docs){
        if (err){
            console.warn("Could not get all rdvs");
            next(err);
        }else{
            res.send(req.rdv);
        }
    });
});

 /**
* @api {patch} /api/rdvs/:id Partially update a rdv
* @apiName PartiallyUpdateRdv
* @apiGroup Rdv
* @apiVersion 1.0.0
* @apiDescription Partially updates a rdv's data
*
* @apiExample Example
 *     PATCH /api/rdvs/5bd7169e8b1b7182a0290f37
 *
 *     {
 *       "date": "1983-01-01T00:00:00.000Z"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *     "deleted": false,
 *     "_id": "5bd7169e8b1b7182a0290f37",
 *     "creator": "Guy",
 *     "date": "1982-01-01T00:00:00.000Z",
 *     "city": "Lausanne",
 *     "street": "121111",
 *     "npa": "1280",
 *     "streetNumber": 12,
 *     "purposeTitle": "Partie de Magic",
 *     "description": "Cherche un geek chaud à se faire une partie au calme",
 *     "category": "Magic",
 *     "__v": 0
 *     }
 */
router.patch('/:id',loadRdvById,function(req, res, next) {
    if (req.body.creator !== undefined) {
        req.rdv.creator = req.body.creator;
    }
    if (req.body.guest !== undefined) {
        req.rdv.guest = req.body.guest;
    }
    if (req.body.city !== undefined) {
        req.rdv.city = req.body.city;
    }
    if (req.body.npa !== undefined) {
        req.rdv.npa = req.body.npa;
    }
    if (req.body.street !== undefined) {
        req.rdv.street = req.body.street;
    }
    if (req.body.streetNumber !== undefined) {
        req.rdv.streetNumber = req.body.streetNumber;
    }
    if (req.body.description !== undefined) {
        req.rdv.description = req.body.description;
    }

    req.rdv.save(function(err, savedRdv) {
        if (err) {
            return next(err);
        }
        console.log(`Updated rdv "${savedRdv.purposeTitle}"`);
        res.send(savedRdv);
    });
});



/**
 * @api {post} /api/rdvs Create a rdv
 * @apiName CreateRdv
 * @apiGroup Rdv
 * @apiVersion 1.0.0
 * @apiDescription Registers a new rdv
 *
 *
 * @apiParam {String} creator Name of the rdv's creator
 * @apiParam {date} date date at witch occurs the rdv
 * @apiParam {String} city city where the rdv occurs
 * @apiParam {Number} npa npa in which the rdv occurs
 * @apiParam {String} street street in witch the rdv occurs
 * @apiParam {Number} streetNumber at which the rdv occurs
 * @apiParam {String} purposeTitle Title of the rdv
 * @apiParam {String} category categoryof the rdv
 *
<<<<<<< HEAD
=======
 * @apiSuccess (Response body) {String} id A unique identifier for the movie generated by the server
>>>>>>> df338f7fedd2abb6394cd5889a937b336c27d261
 *
 * @apiExample Example
 *     POST /api/rdvs HTTP/1.1
 *     Content-Type: application/json
 *
 *    {
 *    "creator": "Guy",
 *    "date": "1983-01-01T00:00:00.000Z",
 *    "city": "Lausanne",
 *    "street": "chemin du Levant",
 *    "npa": "1280",
 *    "streetNumber": "12",
 *    "purposeTitle": "Partie de Magic",
 *    "description": "Cherche un geek chaud à se faire une partie au calme",
 *    "category": "Magic"
 *    }
 *
 * @apiSuccessExample 201 Created
 *     HTTP/1.1 201 Created
 *     Content-Type: application/json
 *
 *     {
 *     "_id": "5bd71eb9cbc8c382a7b07ee4",
 *     "deleted": false,
 *     "creator": "Guy",
 *     "date": "1983-01-01T00:00:00.000Z",
 *     "city": "Lausanne",
 *     "street": "chemin du Levant",
 *     "npa": "1280",
 *     "streetNumber": 12,
 *     "purposeTitle": "Partie de Magic",
 *     "description": "Cherche un geek chaud à se faire une partie au calme",
 *     "category": "Magic",
 *     "__v": 0
 *     }
 */
router.post('', function(req, res, next) {
    new Rdv(req.body).save(function(err, savedrdv) {
        if (err) {
            return next(err);
        }
        console.log(`Rdv created "${savedrdv}"`);
        res.status(201).send(savedrdv);
    });
});


/**
 * Delete a rdv   OKKKKKKK
 */

 /**
 * @api {delete} /api/rdvs/:id Delete a rdv
 * @apiName DeleteRdv
 * @apiGroup Rdv
 * @apiVersion 1.0.0
 * @apiDescription Permanently deletes a rdv.
 *
 *
 * @apiExample Example
 *     DELETE /api/rdvs/5bd71eb9cbc8c382a7b07ee4 HTTP/1.1
 *     Content-Type: application/json
 *
 * @apiSuccessExample 204 No Content
 *     HTTP/1.1 204 No Content
 */
router.delete('/:id', loadRdvById, function(req, res, next) {
    req.rdv.delete(function(err) {
        if (err) {
            return next(err);
        }
        //  console.log(`Deleted rdv "${req.rdv.}"`);
        res.sendStatus(204);
    });
});

/**
 * Middleware that loads the rdv corresponding to the ID in the URL path.
 * Responds with 404 Not Found if the ID is not valid or the rdv does not exist.
 */
function loadRdvById(req, res, next){
    const rdvId = req.params.id;
    if (!ObjectId.isValid(rdvId)) {
        return rdvNotFound(res, rdvId);
    }

    let query = Rdv.findById(rdvId)
    query.exec(function(err, rdv) {
        if (err) {
            console.warn("Could not get the rdv");
            return next(err);
        } else if (!rdv) {
            return rdvNotFound(res, rdvId);
        }
        else{
          req.rdv = rdv;
          next();
        }
    });
}
/**
 * Message in case of a "not found"
 * @param res
 * @param rdvId
 * @returns {*}
 */
function rdvNotFound(res, rdvId) {
    return res.status(404).type('text').send(`No rdv found with ID:  ${rdvId}`);
}


module.exports = router;
