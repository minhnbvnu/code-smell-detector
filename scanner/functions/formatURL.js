function formatURL(httpsOptions) {
  var url;
  if (httpsOptions.protocol) {
    url = httpsOptions.protocol;
  } else {
    url = 'https:';
  }
  url += '//';
  if (httpsOptions.auth) {
    url += httpsOptions.auth + '@';
  }
  if (httpsOptions.host) {
    url += httpsOptions.host;
  } else if (httpsOptions.hostname) {
    url += httpsOptions.hostname;
  } else {
    url += 'localhost';
  }
  if (httpsOptions.port && !url.includes(':' + httpsOptions.port)) {
    url += ':' + httpsOptions.port;
  }
  if (httpsOptions.path) {
    url += httpsOptions.path;
  } else {
    url += '/';
  }
  return url;
}