function Group_getPrototypeOf(o) {
  Group_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Group_getPrototypeOf(o);
}