function isDict(v, type) {
  return v instanceof Dict && (type === undefined || isName(v.get("Type"), type));
}