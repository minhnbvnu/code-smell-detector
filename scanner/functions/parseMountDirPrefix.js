function parseMountDirPrefix(nasConfig) {
  if (definition.isNasAutoConfig(nasConfig)) {
    return '/mnt/auto/';
  }
  const mountPoints = nasConfig.MountPoints;
  ensureOnlyOneMountPoinExists(mountPoints);

  const mountPoint = _.head(mountPoints).MountDir;
  if (_.endsWith(mountPoint, '/')) {
    return mountPoint;
  }
  return mountPoint + '/';
}