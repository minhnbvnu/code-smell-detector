function Search_getPrototypeOf(o) {
  Search_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return Search_getPrototypeOf(o);
}