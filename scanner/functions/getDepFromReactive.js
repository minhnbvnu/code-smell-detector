function getDepFromReactive(object, key) {
    var _a;
    return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
  }