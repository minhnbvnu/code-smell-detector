function makeAssertCloseWithPrecision (precision) {
  return function (a, b, message) {
    assertClose(a, b, message, precision);
  };
}