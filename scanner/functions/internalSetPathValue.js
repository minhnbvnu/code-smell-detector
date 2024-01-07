function internalSetPathValue(obj, val, parsed) {
    var tempObj = obj;
    var pathDepth = parsed.length;
    var part = null;
    // Here we iterate through every part of the path
    for (var i = 0; i < pathDepth; i++) {
      var propName = null;
      var propVal = null;
      part = parsed[i];

      // If it's the last part of the path, we set the 'propName' value with the property name
      if (i === (pathDepth - 1)) {
        propName = typeof part.p === 'undefined' ? part.i : part.p;
        // Now we set the property with the name held by 'propName' on object with the desired val
        tempObj[propName] = val;
      } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
        tempObj = tempObj[part.p];
      } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
        tempObj = tempObj[part.i];
      } else {
        // If the obj doesn't have the property we create one with that name to define it
        var next = parsed[i + 1];
        // Here we set the name of the property which will be defined
        propName = typeof part.p === 'undefined' ? part.i : part.p;
        // Here we decide if this property will be an array or a new object
        propVal = typeof next.p === 'undefined' ? [] : {};
        tempObj[propName] = propVal;
        tempObj = tempObj[propName];
      }
    }
  }