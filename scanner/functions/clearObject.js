function clearObject (obj) {
  var key;
  if (!obj || obj.constructor !== Object) { return; }
  for (key in obj) { obj[key] = undefined; }
}