function isBlob(obj) {
  return toString.call(obj) === '[object Blob]';
}