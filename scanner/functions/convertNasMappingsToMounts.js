function convertNasMappingsToMounts(baseDir, nasMappings) {
  return nasMappings.map(nasMapping => {
    // console.log('mounting local nas mock dir %s into container %s\n', nasMapping.localNasDir, nasMapping.remoteNasDir);
    return {
      Type: 'bind',
      Source: path.resolve(baseDir, nasMapping.localNasDir),
      Target: nasMapping.remoteNasDir,
      ReadOnly: false
    };
  });
}