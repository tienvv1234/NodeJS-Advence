const Person = require('./Person');

function Reader(name) {
  // Calls the person constructor with `this` as its context
  Person.call(this, name);
  //this.name = name;
}

// Make our prototype from Person.prototype so we inherit Person's method
Reader.prototype = Object.create(Person.prototype);

// Override Person's getName
Reader.prototype.getName = function() {
  console.log('Reader get Name called for ' + this.name);
  // Call the original version of getName that we override.
  Person.prototype.getName.call(this);
  return 'something';
};

Reader.prototype.constructor = Reader;

// const Person1 = new Person('Some Person');
// Person1.getName();

const reader = new Reader('Some Reader');
reader.getName();
