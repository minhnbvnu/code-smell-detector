function serverBase(url) {
  return url.substring(0, url.indexOf('/', url.indexOf('//') + 2));
}