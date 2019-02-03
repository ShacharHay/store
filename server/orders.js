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
const collectionName = 'orders';

// create new order
router.post('/create', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection(collectionName).insertOne(req.body, function (err, dbRes) {
      if (err) throw err;
      console.log("1 order inserted");
      res.send(true);
      client.close();
    });
  });
});


module.exports = router;
