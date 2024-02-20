function isFile(obj) {
  return toString.call(obj) === '[object File]';
}