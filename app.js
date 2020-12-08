const Game = require('./lib/Game');

new Game().initializeGame();

/* const diane = {
  name: 'Diane',
  sayHello: function() {
    console.log('hello');
  }
};

const obj = Object.create(diane);

// prints '{}' because this object has no direct properties
console.log(obj);

// still works because obj inherited this method from diane
obj.sayHello(); */