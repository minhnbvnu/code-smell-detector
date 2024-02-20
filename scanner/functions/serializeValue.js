function serializeValue(v) {
  if (isObject(v)) {
    return isDate(v) ? v.toISOString() : toJson(v);
  }
  return v;
}