async function convertMountPointsToNasMappings(nasBaseDir, mountPoints) {
  if (!mountPoints) { return []; }

  const nasMappings = [];

  for (let mountPoint of mountPoints) {
    const nasMapping = await convertMountPointToNasMapping(nasBaseDir, mountPoint);

    nasMappings.push(nasMapping);
  }

  return nasMappings;
}