function getJSONType(e) {
    return null === e ? "null" : Array.isArray(e) ? "array" : _typeof(e);
  }