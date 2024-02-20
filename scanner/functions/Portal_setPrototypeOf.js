function Portal_setPrototypeOf(o, p) {
  Portal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return Portal_setPrototypeOf(o, p);
}