function removeUnusedKeys (obj, schema) {
  var key;
  if (!obj || obj.constructor !== Object) { return; }
  for (key in obj) {
    if (!(key in schema)) {
      delete obj[key];
    }
  }
}