const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Picture = require('../models/picture');
const ObjectId = mongoose.Types.ObjectId;


/**
 * Get all pictures
 * @api {get} /pictures/:id Get a picture
 * @apiName GetPicture
 * @apiGroup Picture
 * @apiDescription Get one movie.
 */
router.get('/:id',loadPictureFromParamsMiddleware, function(req, res, next) {
    res.send(req.picture);
});



/**
 * @api {get} /pictures List pictures
 * @apiName GetPictures
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Get all the movies.
 *
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