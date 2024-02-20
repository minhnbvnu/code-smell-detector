function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}