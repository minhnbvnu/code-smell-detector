function stripFile(url) {
  return url.substr(0, stripHash(url).lastIndexOf('/') + 1);
}