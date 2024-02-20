function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}