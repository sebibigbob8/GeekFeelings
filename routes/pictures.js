var express = require('express');
var router = express.Router();
const Picture = require('../models/picture');
/* GET users listing. */
router.get('/', function(req, res, next) {
    /**
     * Get all pictures
     */
});
router.get('/:id', function(req, res, next) {
    /**
     * Get a picture
     */
});
router.patch('/:id', function(req, res, next) {
    /**
     * Modify a picture
     */
});
router.post('', function(req, res, next) {
    /**
     * Create a picture
     */
});
router.delete('/:id', function(req, res, next) {
    /**
     * Delete a picture
     */
});
module.exports = router;