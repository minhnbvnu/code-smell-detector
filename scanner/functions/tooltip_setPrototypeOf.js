function tooltip_setPrototypeOf(o, p) {
  tooltip_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return tooltip_setPrototypeOf(o, p);
}