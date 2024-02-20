function wave_setPrototypeOf(o, p) {
  wave_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return wave_setPrototypeOf(o, p);
}