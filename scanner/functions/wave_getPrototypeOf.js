function wave_getPrototypeOf(o) {
  wave_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return wave_getPrototypeOf(o);
}