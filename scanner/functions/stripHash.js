function stripHash(url) {
  var index = url.indexOf('#');
  return index == -1 ? url : url.substr(0, index);
}