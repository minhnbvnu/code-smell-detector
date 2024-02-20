function failAssertion(object, msg) {
    object = object || global;
    var failMethod = object.fail || assert.fail;
    failMethod.call(object, msg);
  }