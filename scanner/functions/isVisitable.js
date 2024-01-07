function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}