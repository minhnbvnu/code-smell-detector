function isCircular(object, objects) {
    if (typeof object != "object") {
      return false;
    }

    for (var i = 0, l = objects.length; i < l; ++i) {
      if (objects[i] === object) {
        return true;
      }
    }

    return false;
  }