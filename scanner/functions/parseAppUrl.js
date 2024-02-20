function parseAppUrl(relativeUrl, locationObj) {
  var prefixed = (relativeUrl.charAt(0) !== '/');
  if (prefixed) {
    relativeUrl = '/' + relativeUrl;
  }
  var match = urlResolve(relativeUrl);
  locationObj.$$path = decodeURIComponent(prefixed && match.pathname.charAt(0) === '/' ?
      match.pathname.substring(1) : match.pathname);
  locationObj.$$search = parseKeyValue(match.search);
  locationObj.$$hash = decodeURIComponent(match.hash);

  // make sure path starts with '/';
  if (locationObj.$$path && locationObj.$$path.charAt(0) != '/') {
    locationObj.$$path = '/' + locationObj.$$path;
  }
}