function spy(object, property) {
    if (!property && typeof object == "function") {
      return spy.create(object);
    }

    if (!object && !property) {
      return spy.create(function () {
      });
    }

    var method = object[property];
    return sinon.wrapMethod(object, property, spy.create(method));
  }