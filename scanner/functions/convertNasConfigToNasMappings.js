async function convertNasConfigToNasMappings(nasBaseDir, nasConfig, serviceName) {
  if (!nasConfig) { return []; }

  const isNasAuto = definition.isNasAutoConfig(nasConfig);

  if (isNasAuto) { // support 'NasConfig: Auto'
    const nasDir = path.join(nasBaseDir, 'auto-default');

    const localNasDir = path.join(nasDir, serviceName);

    if (!(await fs.pathExists(localNasDir))) {
      await fs.ensureDir(localNasDir);
    }

    return [{
      localNasDir,
      remoteNasDir: '/mnt/auto'
    }];
  }
  const mountPoints = nasConfig.MountPoints;

  return await convertMountPointsToNasMappings(nasBaseDir, mountPoints);
}