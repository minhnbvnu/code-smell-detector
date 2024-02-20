function objectCreate(parent) {
  function F() {}
  F.prototype = parent
  return new F()
}