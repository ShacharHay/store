// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const productsApi = require('./server/products');
const categoriesApi = require('./server/categories');
const storesApi = require('./server/stores');
const ordersApi = require('./server/orders');
const twitterApi = require('./server/twitter');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/store-project')));

// Set our api routes
app.use('/api/products', productsApi);
app.use('/api/categories', categoriesApi);
app.use('/api/stores', storesApi);
app.use('/api/orders', ordersApi);
app.use('/api/twitter', twitterApi);

// Catch all other routes and return the index file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/store-project/index.html'));
})
;


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


const server = http.createServer(app);

// socket io
const io = require('socket.io')(server);
io.on('connection', client => {
  // on user send message
  client.on('message', msg => {
    // send message to all users
    io.emit('message',msg)
  });
});

server.listen(port, function(){console.log(`API running on localhost:${port}`)
});
