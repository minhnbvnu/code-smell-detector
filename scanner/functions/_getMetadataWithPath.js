function _getMetadataWithPath(getMetadataFn, paths) {
  return Promise.all(paths.map(path => getMetadataFn(path).then(r => {
    r._path = path;
    return r;
  }).catch(error => undefined)));
}