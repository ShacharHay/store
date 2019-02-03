const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const mongoClient = mongo.MongoClient;
var createCountMinSketch = require("count-min-sketch")

// Connection URL
const dbUrl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'store';

// collection name
const collectionName = 'products';

// CMS - Count Min Sketch
var countMinSketch = createCountMinSketch()

// create new product
router.post('/create', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection(collectionName).insertOne(req.body, function (err, dbRes) {
      if (err) throw err;
      console.log("1 product inserted");
      res.send(true);
      client.close();
    });
  });
});


// delete product by ID
router.delete('/delete', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    db.collection(collectionName).deleteOne({'_id': new mongo.ObjectID(req.query.id)}, function (err, obj) {
      if (err) throw err;
      console.log("1 product deleted");
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
        console.log("1 product document updated");
        res.send(true);
        client.close();
      });
  });
});

router.get('/search', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    // check if the name or/and the description contains the user query
    var dbQuery = {
      name: {"$regex": req.query.name == null ? "" : req.query.name, "$options": "i"},
      description: {"$regex": req.query.description == null ? "" : req.query.description, "$options": "i"}
    };

    // if min or max are set -> add to query
    if (isNaN(req.query.minPrice) === false || isNaN(req.query.maxPrice) === false) {
      dbQuery.price = {};

      if (isNaN(req.query.minPrice) === false) {
        dbQuery.price['$gte'] = parseFloat(req.query.minPrice);
      }

      if (isNaN(req.query.maxPrice) === false) {
        dbQuery.price['$lte'] = parseFloat(req.query.maxPrice);
      }
    }
    db.collection(collectionName).find(dbQuery).toArray(function (err, dbRes) {
      if (err) throw err;
      res.send(dbRes);
      client.close();
    });
  });
});

// return one product document by ID
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

router.get('/byCategories', function (req, res) {
  mongoClient.connect(dbUrl, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    // map reduce
    db.collection(collectionName).mapReduce(
      // map between category to product
      function () {
        if (this.categories == null || this.categories.length === 0) {
          return;
        }

        for (var cate of this.categories) {
          emit(cate, this);
        }
      },
      // set as key-value
      function (categoryId, products) {
        return {key: categoryId, value: products};
      }, {out: {inline: 1}},
      function (err, results) {
        assert.equal(null, err);
        var categoryProducts = {};
        for (var item of results) {
          if ((item._id in categoryProducts) === false) {
            categoryProducts[item._id] = [];
          }
          if (Array.isArray(item.value.value)) {
            categoryProducts[item._id] = categoryProducts[item.value.key].concat(item.value.value);
          } else {
            categoryProducts[item._id].push(item.value);
          }
        }
        res.send(categoryProducts);
        client.close();
      });
  });
});

router.post('/incrementProductView', function (req, res) {
  countMinSketch.update(req.body.id, 1);
  res.send({});
});

router.get('/productCounter', function (req, res) {
  res.send("" + countMinSketch.query(req.query.id))
});

module.exports = router;
