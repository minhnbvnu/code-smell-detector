function isIterableMap(collection) {
  return typeof collection.set === 'function';
}