function Password_getPrototypeOf(o) {
  Password_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Password_getPrototypeOf(o);
}