function walk(obj, fn) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    fn(obj, keys[i], obj[keys[i]]);
  }
}