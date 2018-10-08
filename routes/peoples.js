var express = require('express');
var router = express.Router();
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;
// Define a schema
const peopleSchema = new Schema({
    name: String,
    birthDate: String,
    date: { type: Date, default: Date.now  }, // Default value
    children : Number,
    address : String,
    street : String,
    interests : String,
    phone : Number
});
let peopleModel = MONGOOSE.model('People',peopleSchema,'people'); //3eme args pck le nom n'est pas conventionnel

/* GET people listing. */
router.get('/', function(req, res, next) {
    let query = peopleModel.find({});
    query.exec(function (err,docs)
    {
        console.log(docs);
    })
    res.send('try to Connected to MongoDB');
    // Do something with "db"...
    db.close();
});
module.exports = router;