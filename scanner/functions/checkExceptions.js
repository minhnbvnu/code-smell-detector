function checkExceptions(node, exceptions) {
  if (!exceptions || !exceptions.length) {
    return false;
  }

  var object = node.left.object.name;
  var property = node.left.property.name;

  for (var i = 0, length = exceptions.length; i < length; i += 1) {
    var exception = exceptions[i];

    var objectMatch = match(object, exception.object);
    var propertyMatch = match(property, exception.property);

    if (exception.object && exception.property) {
      if (objectMatch && propertyMatch) {
        return true;
      }
    }
    else if (exception.object) {
      if (objectMatch) {
        return true;
      }
    }
    else if (exception.property) {
      if (propertyMatch) {
        return true;
      }
    }
  }
}