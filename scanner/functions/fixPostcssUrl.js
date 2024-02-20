function fixPostcssUrl(url) {
  return url.replace(/^http:\/+/, 'http://').replace(/^file:\/*/, 'file:///');
}