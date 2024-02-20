async function resolveNasYmlToMount(baseDir, serviceName) {
  const nasMappings = await extractNasMappingsFromNasYml(baseDir, serviceName);
  return convertNasMappingsToMounts(getRootBaseDir(baseDir), nasMappings);
}