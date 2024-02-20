function fromJson(json) {
  return isString(json)
      ? JSON.parse(json)
      : json;
}