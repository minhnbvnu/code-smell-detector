function shim(obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}