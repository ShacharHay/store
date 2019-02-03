const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const mongoClient = mongo.MongoClient;

// Connection URL
const dbUrl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'store';

// collection name
const collectionName = 'stores';


router.get('/search', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    // check if the name/phone/city contains the user query
    var dbQuery = {
      name: {"$regex": req.query.name == null ? "" : req.query.name, "$options": "i"},
      phone: {"$regex": req.query.phone == null ? "" : req.query.phone, "$options": "i"},
      city: {"$regex": req.query.city == null ? "" : req.query.city, "$options": "i"}
    };

    db.collection(collectionName).find(dbQuery).toArray(function (err, dbRes) {
      if (err) throw err;
      res.send(dbRes);
      client.close();
    });
  });
});


router.get('/storesCitiesCount', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    // map reduce
    db.collection(collectionName).aggregate(
      [
        {
          $group: {
            _id: "$city",
            count: {$sum: 1}
          }
        }
      ]
    ).toArray(function (err, dbRes) {
      if (err) throw err;
      res.send(dbRes);
      client.close();
    });
  });
});

module.exports = router;
