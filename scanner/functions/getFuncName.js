function getFuncName(aFunc) {
    if (typeof aFunc !== 'function') {
      return null;
    }

    var name = '';
    if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
      // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
      var match = toString.call(aFunc).match(functionNameMatch);
      if (match) {
        name = match[1];
      }
    } else {
      // If we've got a `name` property we just use it
      name = aFunc.name;
    }

    return name;
  }