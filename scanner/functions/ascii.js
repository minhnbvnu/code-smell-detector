function ascii(object, processed, indent) {
    if (typeof object == "string") {
      var quote = typeof this.quoteStrings != "boolean" || this.quoteStrings;
      return processed || quote ? '"' + object + '"' : object;
    }

    if (typeof object == "function" && !(object instanceof RegExp)) {
      return ascii.func(object);
    }

    processed = processed || [];

    if (isCircular(object, processed)) {
      return "[Circular]";
    }

    if (Object.prototype.toString.call(object) == "[object Array]") {
      return ascii.array.call(this, object, processed);
    }

    if (!object) {
      return "" + object;
    }

    if (buster.isElement(object)) {
      return ascii.element(object);
    }

    if (typeof object.toString == "function" &&
      object.toString !== Object.prototype.toString) {
      return object.toString();
    }

    for (var i = 0, l = specialObjects.length; i < l; i++) {
      if (object === specialObjects[i].obj) {
        return specialObjects[i].value;
      }
    }

    return ascii.object.call(this, object, processed, indent);
  }