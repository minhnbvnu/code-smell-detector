function generateNasPythonPaths(nasConfig) {
  const isNasAuto = definition.isNasAutoConfig(nasConfig);

  if (isNasAuto) {
    return {
      'PYTHONPATH': generatePythonPaths('/mnt/auto')
    };
  }
  const nasEnvs = [];

  _.forEach(nasConfig.MountPoints, (mountPoint) => {
    const { mountDir } = resolveMountPoint(mountPoint);
    nasEnvs.push(generatePythonPaths(mountDir));
  });

  return {
    'PYTHONPATH': nasEnvs.join(':')
  };
}