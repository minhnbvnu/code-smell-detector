function getUrlStringfromUrlObject (urlObject) {
  var url = '';
  if (!urlObject) {
    return url;
  }
  if (urlObject.protocol) {
    url += (urlObject.protocol.endsWith('://') ? urlObject.protocol : urlObject.protocol + '://');
  }
  if (urlObject.auth && urlObject.auth.user) {
    url = url + ((urlObject.auth.password) ?
      // ==> username:password@
      urlObject.auth.user + ':' + urlObject.auth.password : urlObject.auth.user) + '@';
  }
  if (urlObject.host) {
    url += urlObject.getHost();
  }
  if (urlObject.port) {
    url += ':' + urlObject.port.toString();
  }
  if (urlObject.path) {
    url += urlObject.getPath();
  }
  if (urlObject.query && urlObject.query.count()) {
    let queryString = getQueryString(urlObject);
    queryString && (url += '?' + queryString);
  }
  if (urlObject.hash) {
    url += '#' + urlObject.hash;
  }

  return sanitize(url, 'url');
}