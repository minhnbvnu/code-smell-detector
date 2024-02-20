function createObject(object) {
    var newObject;

    if (Object.create) {
      newObject = Object.create(object);
    } else {
      var F = function () {
      };
      F.prototype = object;
      newObject = new F();
    }

    newObject.Date.clock = newObject;
    return newObject;
  }