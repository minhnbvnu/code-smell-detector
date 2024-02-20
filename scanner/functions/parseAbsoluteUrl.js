function parseAbsoluteUrl(absoluteUrl, locationObj) {
  var parsedUrl = urlResolve(absoluteUrl);

  locationObj.$$protocol = parsedUrl.protocol;
  locationObj.$$host = parsedUrl.hostname;
  locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
}