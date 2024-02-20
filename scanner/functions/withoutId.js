function withoutId(obj) {
  const clone = xtend(obj);
  delete clone.id;
  return clone;
}