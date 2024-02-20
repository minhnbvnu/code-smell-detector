function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}