function popconfirm_getPrototypeOf(o) {
  popconfirm_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return popconfirm_getPrototypeOf(o);
}