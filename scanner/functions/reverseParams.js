function reverseParams(iteratorFn) {
  return function(value, key) {iteratorFn(key, value);};
}