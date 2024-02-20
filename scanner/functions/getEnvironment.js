function getEnvironment(key) {
  if (_environments[key] === undefined) {
    _environments[key] = new QuerystringKeyEnvironment(key);
  }
  return _environments[key];
}