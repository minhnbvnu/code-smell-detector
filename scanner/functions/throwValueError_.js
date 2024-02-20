function throwValueError_(err, value, index) {
  err.message = err.constructor.name +
    ' at index ' + index + ': ' + value;
  throw err;
}