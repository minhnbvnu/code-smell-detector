function isEmptyObject (keys) {
  var key;
  for (key in keys) { return false; }
  return true;
}