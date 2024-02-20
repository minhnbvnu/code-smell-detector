function getMetaPath(artifactsTplPath) {
  if (artifactsTplPath.indexOf(DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX) === -1) { return null; }
  return path.resolve(path.dirname(artifactsTplPath), 'meta.json');
}