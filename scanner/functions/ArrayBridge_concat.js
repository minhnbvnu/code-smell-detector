function ArrayBridge_concat(pair) {
  return Array.prototype.concat.apply([], pair);
}