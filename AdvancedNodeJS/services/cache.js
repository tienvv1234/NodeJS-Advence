const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;
//const find = mongoose.Query.prototype.find;

// we are using the function keyword and not an arrow function
// because an arrow function tryies to mess around with the value of
// this inside the function.
mongoose.Query.prototype.exec = async function() {
  // so inside this function if we were to write out `this` it should
  // reference the query that is being produced
  console.log('Im about to run a query');
  // console.log('this', this);
  // console.log('arguments', arguments);
  //so this right here is the code that we would run to execute
  // the original untouched pristine copy of exec that you and i
  // have not messed around with
  // we use the apply function so that we ca pass in automatically any
  // arguments that are passed into exec

  // console.log(this.getQuery()); // --> { _user: '5c45e9851bb70230a4b7d201' }
  // console.log(this.mongooseCollection.name); // --> blogs
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  });

  // console.log(key);

  // See if we have avalue for 'key' in redis
  const cacheValue = await client.get(JSON.stringify(key));

  // if we do, return that
  if (cacheValue) {
    console.log(cacheValue);
  }

  // otherwise, issue the query and store the result
  const result = await exec.apply(this, arguments);
  console.log('result', result);

  // return mongoose.Query.prototype.exec.apply(this, arguments);
};

// mongoose.Query.prototype.find = function() {
//   console.log('override find function');

//   return find.apply(this, arguments);
// };
