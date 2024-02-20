function resetPointers() {
  // no clear method so only alternative is to create a new WeakMap
  // @see https://stackoverflow.com/questions/37528622/why-is-weakmap-clear-method-deprecated
  pointers = /*@__PURE__*/ new WeakMap();
}