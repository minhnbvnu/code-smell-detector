function getOriginFromUrl(url) {
  if (!url) {
    return undefined;
  }
  var parsed = getLocationFromUrl(url);
  if (!parsed) {
    return null;
  }
  var origin = parsed.protocol + '//' + parsed.hostname;
  if (parsed.port) {
    origin += ':' + parsed.port;
  }
  return origin;
}