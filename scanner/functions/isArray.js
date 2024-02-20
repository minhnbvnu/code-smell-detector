function isArray(obj) {
  return '[object Array]' == {}.toString.call(obj);
}