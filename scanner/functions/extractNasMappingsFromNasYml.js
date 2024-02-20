async function extractNasMappingsFromNasYml(baseDir, serviceName) {
  const rootBaseDir = getRootBaseDir(baseDir);
  const nasYmlPath = path.join(rootBaseDir, '.nas.yml');

  const content = await getNasMappingsFromNasYml(nasYmlPath);

  if (_.isEmpty(content)) {
    return [];
  }
  if (_.isEmpty(content[serviceName])) {
    return [];
  }
  return content[serviceName];
}