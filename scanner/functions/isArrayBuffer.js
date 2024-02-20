function isArrayBuffer(obj) {
  return toString.call(obj) === '[object ArrayBuffer]';
}