function replaceNasConfig(nasConfig, mountDir) {
  const cloneNasConfig = _.cloneDeep(nasConfig);
  cloneNasConfig.MountPoints = cloneNasConfig.MountPoints.filter(f => f.MountDir === mountDir);
  return cloneNasConfig;
}