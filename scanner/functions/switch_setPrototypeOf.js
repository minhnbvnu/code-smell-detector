function switch_setPrototypeOf(o, p) {
  switch_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return switch_setPrototypeOf(o, p);
}