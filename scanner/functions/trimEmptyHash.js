function trimEmptyHash(url) {
  return url.replace(/(#.+)|#$/, '$1');
}