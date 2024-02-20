function convertZeroes(degrees) {
  return degrees.map(value => value === -0 ? 0 : value);
}