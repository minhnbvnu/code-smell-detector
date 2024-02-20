function elements(selector) {
  if (selector) {
    return function (value, index, array) {
      return value.nodeType === 1 && value.matches(selector);
    };
  }

  return function (value, index, array) {
    return value.nodeType === 1;
  };
}