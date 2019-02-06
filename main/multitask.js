const start = Date.now();
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  //timer
  // we call fs.readFile --> Node gets some 'stats' on the file (requires HD access) note here:
  // the thread will go to take care other task because this step go into hhd wait for return infomation
  // --> HD accessed, stats returned note here:
  // the thread will go to take care other task because this step go into hhd wait for return infomation --> Node requests to read the file --> HD accessed,
  // file contents streamed back to app --> node returens file contents to us
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();

// because  dohash and readfile also take thread pool
