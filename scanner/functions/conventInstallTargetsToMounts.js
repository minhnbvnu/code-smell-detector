function conventInstallTargetsToMounts(installTargets) {

  if (!installTargets) { return []; }

  const mounts = [];

  _.forEach(installTargets, (target) => {
    const { hostPath, containerPath } = target;

    if (!(fs.pathExistsSync(hostPath))) {
      fs.ensureDirSync(hostPath);
    }

    mounts.push({
      Type: 'bind',
      Source: hostPath,
      Target: containerPath,
      ReadOnly: false
    });
  });

  return mounts;
}