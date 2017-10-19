var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/items', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27018/grocerylist';

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the Server', err);
        } else {
            // We are connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('grocerylist');
            console.log(db);

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.render(result);
                } else {
                    res.send('No documents found');
                }
                //Close connection
                db.close();
            });
        }
    });
});

module.exports = router;