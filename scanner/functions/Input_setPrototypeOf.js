function Input_setPrototypeOf(o, p) {
  Input_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return Input_setPrototypeOf(o, p);
}