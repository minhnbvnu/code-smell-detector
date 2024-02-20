async function resolveNasConfigToMounts(baseDir, serviceName, nasConfig, nasBaseDir) {
  const nasMappings = await nas.convertNasConfigToNasMappings(nasBaseDir, nasConfig, serviceName);
  return convertNasMappingsToMounts(getRootBaseDir(baseDir), nasMappings);
}