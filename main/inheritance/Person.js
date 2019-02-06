function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  console.log('Person get name called for ' + this.name);
  return this.name;
};

module.exports = Person;
