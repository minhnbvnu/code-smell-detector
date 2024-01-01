function isObjectOrArray (value) {
  return value && (value.constructor === Object || value.constructor === Array) &&
         !(value instanceof window.HTMLElement);
}