var express = require('express');
var router = express.Router();
const Rdv = require('../models/rdv');
/* GET users listing. */
router.get('/', function(req, res, next) {
    /**
     * Get all rdvs
     */
});
router.get('/:id', function(req, res, next) {
    /**
     * Get a rdv
     */
});
router.patch('/:id', function(req, res, next) {
    /**
     * Modify a rdv
     */
});
router.post('', function(req, res, next) {
    /**
     * Create a rdv
     */
});
router.delete('/:id', function(req, res, next) {
    /**
     * Delete a rdv
     */
});
module.exports = router;