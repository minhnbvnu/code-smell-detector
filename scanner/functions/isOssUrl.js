function isOssUrl(url) {
  if (_.isEmpty(url)) { return false; }
  return url.startsWith('oss://');
}