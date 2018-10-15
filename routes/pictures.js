const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Picture = require('../models/picture');
const ObjectId = mongoose.Types.ObjectId;

/* GET users listing. */

router.get('/:id',loadPictureFromParamsMiddleware, function(req, res, next) {
    //console.log("caca");
    res.send(req.picture);
});


router.get('/', function(req, res, next) {
    console.log("ici");
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
* Modify a picture
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
    console.log("ok");
    console.log(`Updated picture "${savedPicture.title}`);
    res.send(savedPicture);
    });
});

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


router.delete('/:id', loadPictureFromParamsMiddleware, function(req, res, next) {
     
    req.picture.delete(function(err) {
        if (err) {
            return next(err);
        }
        console.log(`Deleted picture "${req.picture.src}`);
        res.sendStatus(204);
    }) ;
});


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

function pictureNotFound(res, movieId) {
  return res.status(404).type('text').send(`No picture found with ID ${pictureId}`);
}


module.exports = router;