async function getNasMappingsFromNasYml(nasYmlPath) {
  const contentObj = await readFileFromNasYml(nasYmlPath);
  return contentObj.nasMappings || {};
}