function isObject (value) {
  return value && value.constructor === Object && !(value instanceof window.HTMLElement);
}