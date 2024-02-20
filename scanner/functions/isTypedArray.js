function isTypedArray(value) {
  return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value));
}