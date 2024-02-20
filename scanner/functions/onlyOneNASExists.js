function onlyOneNASExists(nasConfig) {
  const isNasAuto = isNasAutoConfig(nasConfig);

  if (_.isEmpty(nasConfig || isNasAuto)) {
    return false;
  }
  const mountPoints = nasConfig.MountPoints || [];
  return mountPoints.length === 1;
}