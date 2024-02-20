function stub(object, property, func) {
    if (!!func && typeof func != "function") {
      throw new TypeError("Custom stub should be function");
    }

    var wrapper;

    if (func) {
      wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
    } else {
      wrapper = stub.create();
    }

    if (!object && !property) {
      return sinon.stub.create();
    }

    if (!property && !!object && typeof object == "object") {
      for (var prop in object) {
        if (typeof object[prop] === "function") {
          stub(object, prop);
        }
      }

      return object;
    }

    return sinon.wrapMethod(object, property, wrapper);
  }