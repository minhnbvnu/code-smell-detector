function isStrictlyNaN(number) {
  return typeof(number) === 'number' && isNaN(number);
}