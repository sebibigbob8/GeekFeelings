var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
    /**
     * Get all users
     */
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