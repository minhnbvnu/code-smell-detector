function button_setPrototypeOf(o, p) {
  button_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return button_setPrototypeOf(o, p);
}