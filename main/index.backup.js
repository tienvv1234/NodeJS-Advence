const express = require('express');
const app = express();
const crypto = require('crypto');
const cluster = require('cluster');

// is the file being executed in master mode
if (cluster.isMaster) {
  // cause index.js to be executed again but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // i am a child, i'm going to act like a server and do nothing else
  // function doWork(duration) {
  //   const start = Date.now();
  //   while (Date.now - start < duration) {}
  // }

  app.get('/', (req, res) => {
    // doWork(5000); // this will blocking the event loop about 5s
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.listen(3000);
  // node mon by default out of the box does not work very nicely with clustering,
  // do not use nodemon here

  // whenever some request comes into our server it gets processed inside of one single thread
  // that contains our event loop, so some request comes in our server processes it and then
  // generate a response
}
