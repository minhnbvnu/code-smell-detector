async function getModifiedTimestamps(tplPath) {
  if (tplPath.indexOf(DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX) === -1) { return {}; }

  const metaPath = path.resolve(path.dirname(tplPath), 'meta.json');

  if (!await fs.pathExists(metaPath)) { return {}; }

  const metaObj = await readJsonFromFile(metaPath);

  if (_.isEmpty(metaObj)) { return {}; }

  return _.pickBy((metaObj.modifiedTimestamps || {}), (mtime, filePath) => {
    const lstat = fs.lstatSync(filePath);
    return mtime !== lstat.mtime.getTime().toString();
  });
}