function parseUrl (src) {
  var parsedSrc = src.match(/\url\((.+)\)/);
  if (!parsedSrc) { return; }
  return parsedSrc[1];
}