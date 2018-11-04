const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Picture = require('../models/picture');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'keykey-DoYouLoveMe';
const user = [];
const userIds = user.map(user => user._id);


/**
 * @api {get} /pictures/:id Get a picture
 * @apiName GetPicture
 * @apiGroup Picture
 * @apiDescription Get one movie.
 *
 * @apiExample
 *      GET /api/pictures/5bd709792832dd1b5c723b43 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *      HTTP/1.1 200 OK
 *      Content-Type: application/json
 *
 *      {
 *          "user": "5bd6drb42db32a3e8c4e1124",
 *          "_id": "5bd709792832dd1b5c723b43",
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEw",
 *          "description": "phot prise en pleine journée",
 *          "__v": 0
 *      },
 */
router.get('/:id',loadPictureFromParamsMiddleware, function(req, res, next) {
    res.send(req.picture);
});



/**
 * Get all pictures
 * @api {get} /pictures List pictures
 * @apiName GetPictures
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Get all the movies.
 *
 * @apiParam (URL query parameters) {String} [user] Select only pictures that was uploaded by the person with the specified ID
 *
 * @apiSuccess src source of the picture
 * @apiSuccess description description of the picture
 * @apiSuccess user user id of the user who uploaded the picture
 * 
 * @apiExample
 *      GET /api/pictures?user=5bd6dab42db32a3e8c4e1124 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *      HTTP/1.1 200 OK
 *      Content-Type: application/json
 *
 *   [
 *      {
 *          "user": "5bd6drb42db32a3e8c4e1124",
 *          "_id": "5bd709792832dd1b5c723b43",
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEw",
 *          "description": "phot prise en pleine journée",
 *          "__v": 0
 *      },
 *      {
 *          "user": "5bd6drb42rb32a3e8c4e1124",
 *          "_id": "5bd709cd2832dd1b5c723b46",
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=ra&uact=8&ved=2ahUKEw",
 *          "description": "Vacances chez la famille",
 *          "__v": 0
 *      }
 *   ]
 */
router.get('/', function(req, res, next) {
    //Count total pictures matching the URL query parameters
    const countQuery = queryPictures(req);
    
    countQuery.count(function(err, total) {
        
        if(err) {
            console.warn("Could not get all pictures");
            return next(err);
        }
    
        //Prepare the initial database query from the URL query parameters
        let query = queryPictures(req);
        
        //Take all the pictures from a particular user
        if (ObjectId.isValid(req.query.user)) {
            query = query.where('user').equals(req.query.user);
        }
        
        //Execute the query
        query.sort({ title: 1 }).exec(function(err, pictures) {
            if(err){
                return next(err);
            }
            
            res.send(pictures);
        });
    });
});


/**
 * @api {patch} /pictures/:id Partially update a picture
 * @apiName PartiallyUpdatePicture
 * @apiGroup Picture
 * @apiDescription Partially updates a picture's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiExample Example
 *      PATCH /api/pictures/5bd709cd2832dd1b5c723b46 HTTP/1.1
 *      Content-Type: application/json
 *      
 *      {    
 *          "description": "Vacations in Thailand, was awesome !"
 *      }
 *
 * @apiSuccessExample 200 OK
 *      HTTP/1.1 200 OK
 *      Content-Type: application/json
 *
 *      {
 *          "user": "5bd6dab42db32a3e8c4e1124",
 *          "id": "5bd709cd2832dd1b5c723b46",
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjUtM7HsqveAhUQC-wKHbscDwkQjRx6BAgBEAU&url=https%3A%2F%2Fpixabay.com%2Ffr%2Fimage-statue-laiton-enfant-art-1465348%2F&psig=AOvVaw0ErNhIADV0kxp3uT7cAIFb&ust=1540893717663906",
 *       "description": "Vacations in Thailand, was awesome !",
 *       "__v": 0
 *      }
 */
router.patch('/:id',loadPictureFromParamsMiddleware, function(req, res, next) {
    
    //Verify if the description is undefined
    //if not modify the description
    if(req.body.description !== undefined) {
        req.picture.description = req.body.description;
    }
    
    if(req.body.src !== undefined) {
        req.picture.src = req.body.src;
    }
    
    req.picture.save(function(err, savedPicture) {
        if(err) {
            return next(err);
        }
    console.log(`Updated picture "${savedPicture.title}`);
    res.send(savedPicture);
    });
});


/**
 * @api {post} /pictures Create a picture
 * @apiName CreatePicture
 * @apiGroup Picture
 * @apiDescription Registers a new picture.
 *
 * @apiSuccess (Response body) {String} id a unique identifier for a picture generated by the server
 *
 * @apiExample Example
 *      POST /api/pictures HTTP/1.1
 *      Content-Type: application/json
 *
 *      {
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX7Zyc5KveAhUM-qQKHcgVAfEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fw3css_images.asp&psig=AOvVaw06wIo8LrfUiMl1FRy0nCbt&ust=1540907048523156",
 *          "description": "Magnifique ciel !",
 *      }
 *
 * @apiSuccessExample 201 Created
 *      HTTP/1.1 201 Created
 *      Content-Type: application/json
 *     
 *      {
 *          "user": "5bd6drb42rb32a3e8c4e1124",
 *          "_id": "58b2926f5e1def0123e97281",
 *          "src": "https://www.google.ch/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX7Zyc5KveAhUM-qQKHcgVAfEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fw3css_images.asp&psig=AOvVaw06wIo8LrfUiMl1FRy0nCbt&ust=1540907048523156",
 *          "description": "Magnifique ciel !",
 *          "__v": 0
 *      }
 *
 */

router.post('', function(req, res, next) {
    /**
     * Create a picture
     */
    new Picture(req.body).save(function(err, savedPicture){
    if (err) {
        return next(err);
    }
    
    console.log(`Created picture "${savedPicture.src}"`);
    
    res.status(201).send(savedPicture);
    });    
    
});


/**
 * @api {delete} /pictures/:id Delete a picture
 * @apiName DeletePicture
 * @apiGroup Picture
 * @apiDescription Permanently deletes a picture.
 *
 * @apiExample Example
 *      DELETE /api/pictures/58b2926f5e1def0123e97281 HTTP/1.1
 *
 * @apiSuccessExample 204 No Content
 *      HTTP/1.1 204 No Content
 *
 */
router.delete('/:id', loadPictureFromParamsMiddleware, function(req, res, next) {
     
    req.picture.delete(function(err) {
        if (err) {
            return next(err);
        }
        console.log(`Deleted picture "${req.picture.src}`);
        res.sendStatus(204);
    }) ;
});



/**
 * Returns a Mongoose query that will retrieve pictures
 */
function queryPictures(req) {

    let query = Picture.find();
    
    if (typeof(req.query.src) == 'string') {
        query = query.where('src').equals(req.query.src);
    }

    if (typeof(req.query.description) == 'string') {
        query = query.where('description').equals(req.query.description);
    }

    return query;
}

Picture.aggregate([
    {
        $match: {
            _id: '$user',
        }
    }
], function(err, results) {
    return(results);
})


/**
 * Middleware that loads the picture
 * Responds with 404 Not Found if the ID is not valid or the movie doesn't exist.
 */
function loadPictureFromParamsMiddleware(req,res,next) {
    
    const pictureId = req.params.id;
    if(!ObjectId.isValid(pictureId)) {
        return pictureNotFound(res, pictureId);
    }
    
    let query = Picture.findById(pictureId)
    
    query.exec(function(err, picture) {
        if(err) {
            return next(err);
        } else if (!picture) {
            return pictureNotFound(res, pictureId);
        }
        
        req.picture = picture;
        next();
    });
}


/**
 * Responds with 404 Not Found and a message indicating that the movie with the specified ID was not found.
 */
function pictureNotFound(res, pictureId) {
  return res.status(404).type('text').send(`No picture found with ID ${pictureId}`);
}


module.exports = router;