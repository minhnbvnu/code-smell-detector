function splitClasses(classes) {
  if (isString(classes)) {
    classes = classes.split(' ');
  }

  // Use createMap() to prevent class assumptions involving property names in
  // Object.prototype
  var obj = createMap();
  forEach(classes, function(klass) {
    // sometimes the split leaves empty string values
    // incase extra spaces were applied to the options
    if (klass.length) {
      obj[klass] = true;
    }
  });
  return obj;
}