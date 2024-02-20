function checkMountPointDomainIsExtremeNas(mountPointDomain, remoteDir) {
  const isExtremeNAS = mountPointDomain.indexOf('.extreme.nas.aliyuncs.com') !== -1;

  if (isExtremeNAS && (remoteDir !== EXTREME_PATH_PREFIX && !remoteDir.startsWith(EXTREME_PATH_PREFIX + '/'))) {
    throw new Error('Extreme nas mount point must start with /share. Please refer to https://nas.console.aliyun.com/#/extreme for more help.');
  }

  return isExtremeNAS;
}