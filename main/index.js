const express = require("express");
const app = express();
const crypto = require("crypto");

const blocking = async () => {
  const start = Date.now();
  while (new Date() - start < 5000) {
    console.log("111111111111111111111111");
  }
};

const blocking2 = async () => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    let sum = 0; //
    let i = 0;
    while (i < 5000000000) {
      sum += i;
      i += 1;
    }
    console.log("sum", sum);
    resolve(sum);
  });
};

const blocking3 = async () => {
  const start = Date.now();
  let sum = 0; //
  let i = 0;
  while (i < 5000000000) {
    sum += i;
    i += 1;
  }
  console.log("sum", sum);
  return sum;
};

app.get("/", async (req, res) => {
  // doWork(5000); // this will blocking the event loop about 5s
  // crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //   res.send('Hi there');
  // });
  // await blocking();

  blocking2()
    .then((v) => {
      console.log(11, v);
    })
    .then(() => {
      blocking3().then((v) => {
        console.log(22, v);
      }).catch(err => console.log(err))
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(33);

  // blocking3()
  // .then(v => {
  //   console.log(22, v);
  // })
  // .catch(err => {
  //   console.log(err);
  // })

  res.send("hi there111111111");
  console.log("end");
});

app.get("/fast", (req, res) => {
  res.send("this was fast!");
});

app.listen(3000);
// node mon by default out of the box does not work very nicely with clustering,
// do not use nodemon here

// whenever some request comes into our server it gets processed inside of one single thread
// that contains our event loop, so some request comes in our server processes it and then
// generate a response
