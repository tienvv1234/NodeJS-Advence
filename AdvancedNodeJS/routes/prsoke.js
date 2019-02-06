const query = Person.find({ occupation: /host/ })
  .where('name.last')
  .equals('Ghost')
  .where('age')
  .gt(17)
  .lt(66)
  .where('likes')
  .in(['vaporizing', 'talking'])
  .limit(10)
  .sort('-occupation')
  .select('name occupation');
//.exec(callback); // this executes the query

query.getOptions();
// this will return { find: { occupation: 'host'}, where: [{'name.last': 'Ghost'}]}

// check to see if this query has already been fetched in redis
// find some way to override the exec funtion
query.exec = function() {
  // to check to see if this query has already been executed
  // and if it has return the result right away
  const result = client.get('query key');
  if (result) {
    return result;
  }
  // otherwise issue the query as normal
  runTheOriginalExecFunction();

  // then save that values in redis
  client.set('query key', result);

  return result;
};

query.exec((err, result) => console.log(result));
// same as...
query.then(result => console.log(result));
// same as ...
const result = await query;
