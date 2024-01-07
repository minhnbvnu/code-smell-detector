function getFunctionName(constructorFn) {
    var name = '';
    if (typeof constructorFn.name === 'undefined') {
      // Here we run a polyfill if constructorFn.name is not defined
      var match = String(constructorFn).match(functionNameMatch);
      if (match) {
        name = match[1];
      }
    } else {
      name = constructorFn.name;
    }

    return name;
  }