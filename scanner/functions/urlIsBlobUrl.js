function urlIsBlobUrl(url) {
  return /^blob:/.test(url);
}