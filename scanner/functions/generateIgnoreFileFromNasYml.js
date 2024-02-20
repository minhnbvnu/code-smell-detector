async function generateIgnoreFileFromNasYml(baseDir) {

  const rootBaseDir = getRootBaseDir(baseDir);
  const nasYmlPath = path.join(rootBaseDir, '.nas.yml');

  const content = await getNasMappingsFromNasYml(nasYmlPath);

  if (_.isEmpty(content)) { return []; }

  const ignoreList = [];

  _.forEach(content, (nasMappings, key) => {
    for (const nasMapping of nasMappings) {
      const ignore = path.relative(baseDir, nasMapping.localNasDir);
      ignoreList.push(ignore.split(path.sep).join('/'));
    }
  });

  return _.uniq(ignoreList);
}