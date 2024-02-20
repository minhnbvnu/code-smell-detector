function normalizeSourceMap(map) {
  const newMap = map;

  // map.file is an optional property that provides the output filename.
  // Since we don't know the final filename in the webpack build chain yet, it makes no sense to have it.
  // eslint-disable-next-line no-param-reassign
  delete newMap.file;

  // eslint-disable-next-line no-param-reassign
  newMap.sourceRoot = "";

  // `less` returns POSIX paths, that's why we need to transform them back to native paths.
  // eslint-disable-next-line no-param-reassign
  newMap.sources = newMap.sources.map((source) => path.normalize(source));

  return newMap;
}