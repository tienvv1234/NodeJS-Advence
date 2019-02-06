const express = require('express');
const app = express();
const crypto = require('crypto');

app.get('/', (req, res) => {
  // doWork(5000); // this will blocking the event loop about 5s
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi there');
  });
});

app.get('/fast', (req, res) => {
  res.send('this was fast!');
});

app.listen(3000);
// node mon by default out of the box does not work very nicely with clustering,
// do not use nodemon here

// whenever some request comes into our server it gets processed inside of one single thread
// that contains our event loop, so some request comes in our server processes it and then
// generate a response
