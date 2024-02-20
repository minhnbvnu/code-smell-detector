function mapMountPointDir(mountPoints, func) {
  let resolvedMountPoints = _.map(mountPoints, (mountPoint) => {
    const serverAddr = mountPoint.ServerAddr;

    const index = _.lastIndexOf(serverAddr, ':');
    if (index >= 0) {
      const mountPointDomain = serverAddr.substring(0, index);
      const remoteDir = serverAddr.substring(index + 1);
      const mountDir = mountPoint.MountDir;

      debug('remoteDir is: %s', remoteDir);

      return func(mountPointDomain, remoteDir, mountDir);
    }
  });

  resolvedMountPoints = _.compact(resolvedMountPoints);

  return resolvedMountPoints;
}