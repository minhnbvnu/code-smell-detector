function arrayOf(value, number) {
  return _.range(number).map(function() {
    return value;
  });
}