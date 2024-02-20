function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}