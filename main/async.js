const https = require('https');
const start = Date.now();

function doRequest() {
  https
    .request('https:www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

function doRequest();
function doRequest();
function doRequest();
function doRequest();
function doRequest();
// this print the result so diff form thread pool, thread pool has 4 threads
// which mean only four task can be processed at a time
// but in this case we had 5 tasks all completed simultaneously 
// libuv is used to issue the request then it just waits on the os to emit a signal
// that some response has come back to the reqeust so because libuv is delegating the work done
// to the operating system itseft decides whether to make a new thread or not or just generally
// how to handle the entire proces of making the request, so because the os is making the request
// there is no blocking of our javascript code inside of our event loop or anything else inside of our application
// everything or all the work is being done by the os itself and we are not touching a thread pool in this case