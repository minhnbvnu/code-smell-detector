function isName(v, name) {
  return v instanceof Name && (name === undefined || v.name === name);
}