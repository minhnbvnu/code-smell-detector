async function saveNasMappings(nasYmlPath, nasMappings) {
  if (_.isEmpty(nasMappings)) { return {}; }

  const contentObj = await readFileFromNasYml(nasYmlPath);

  const mergedNasMappings = await mergeNasMappingsInNasYml(nasYmlPath, nasMappings);

  contentObj.nasMappings = mergedNasMappings;

  await fs.writeFile(nasYmlPath, yaml.dump(contentObj));

  return mergedNasMappings;
}