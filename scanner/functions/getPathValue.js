function getPathValue(obj, path) {
    var info = getPathInfo(obj, path);
    return info.value;
  }