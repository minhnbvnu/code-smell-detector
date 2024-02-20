function appendNasEnvs(envs, nasConfig) {
  const isNasAuto = definition.isNasAutoConfig(nasConfig);
  var nasEnvs;
  if (isNasAuto) {
    const mountDir = '/mnt/auto';
    nasEnvs = appendNasMountPointEnv(envs, mountDir);
  } else {
    const mountPoints = nasConfig.MountPoints;
    _.forEach(mountPoints, (mountPoint) => {
      const { mountDir } = resolveMountPoint(mountPoint);
      nasEnvs = appendNasMountPointEnv(envs, mountDir);
    });
  }
  return nasEnvs;
}