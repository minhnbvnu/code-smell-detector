function generateUri(path, domainName) {
  const uri = domainName + path;

  if (_.endsWith(uri, '/')) {
    return _.trimEnd(uri, '/');
  }
  return uri;
}