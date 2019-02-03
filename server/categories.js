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
const collectionName = 'categories';

// create new category
router.post('/create', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection(collectionName).insertOne(req.body, function (err, dbRes) {
      if (err) throw err;
      console.log("1 category inserted");
      res.send(true);
      client.close();
    });
  });
});


// delete category by ID
router.delete('/delete', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    db.collection(collectionName).deleteOne({'_id': new mongo.ObjectID(req.query.id)}, function (err, obj) {
      if (err) throw err;
      console.log("1 category deleted");
      res.send(true);
      client.close();
    });
  });
});

// update the document by the received model
router.put('/update', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var updateValue = req.body.params;
    var query = {'_id': new mongo.ObjectID(updateValue._id)};
    delete updateValue._id;
    db.collection(collectionName).updateOne(query, {$set: updateValue},
      {upsert: false}, function (err, dbRes) {
        if (err) throw err;
        console.log("1 category document updated");
        res.send(true);
        client.close();
      });
  });
});

router.get('/search', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var dbQuery = {};

    if (req.query.name != null) {
      dbQuery.name = {"$regex": req.query.name == null ? "" : req.query.name, "$options": "i"};
    }

    db.collection(collectionName).find(dbQuery).toArray(function (err, dbRes) {
      if (err) throw err;
      res.send(dbRes);
      client.close();
    });
  });
});

// return one category document by ID
router.get('/find', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection(collectionName).findOne({'_id': new mongo.ObjectID(req.query.id)}).then(function (result) {
      if (!result) console.log('document not found');
      res.send(result);
      client.close();
    });
  });
});

module.exports = router;
