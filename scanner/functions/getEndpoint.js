function getEndpoint(apiDoc) {
  var scheme = Array.isArray(apiDoc.schemes) ? apiDoc.schemes[0] : null;
  if (scheme && apiDoc.host) {
    return scheme + '://' + apiDoc.host;
  }
  return '';
}