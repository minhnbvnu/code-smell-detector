async function ensureNasDirExist({
  role,
  vpcConfig,
  nasConfig
}) {
  const mountPoints = nasConfig.MountPoints;
  const modifiedNasConfig = _.cloneDeep(nasConfig);

  modifiedNasConfig.MountPoints = mapMountPointDir(mountPoints, (mountPointDomain, remoteDir, mountDir) => {

    if (checkMountPointDomainIsExtremeNas(mountPointDomain, remoteDir)) {
      // 极速 nas
      return {
        ServerAddr: `${mountPointDomain}:${EXTREME_PATH_PREFIX}`,
        MountDir: `${mountDir}`
      };
    } else if (remoteDir !== '/') {
      return {
        ServerAddr: `${mountPointDomain}:/`,
        MountDir: `${mountDir}`
      };
    } return null;
  });

  const nasMountDirs = mapMountPointDir(mountPoints, (mountPointDomain, remoteDir, mountDir) => {
    if (checkMountPointDomainIsExtremeNas(mountPointDomain, remoteDir)) {
      if (remoteDir !== EXTREME_PATH_PREFIX) {
        return { mountDir, remoteDir, isExtreme: true };
      }
    } else if (remoteDir !== '/') {
      return { mountDir, remoteDir, isExtreme: false };
    }
    return null;
  });

  debug('dirs need to check: %s', nasMountDirs);

  if (!_.isEmpty(nasMountDirs)) {
    let nasRemoteDirs = [];
    let nasDirsNeedToCheck = [];
    for (let nasMountDir of nasMountDirs) {
      nasRemoteDirs.push(nasMountDir.remoteDir);
      if (nasMountDir.isExtreme) {
        // 002aab55-fbdt.cn-hangzhou.extreme.nas.aliyuncs.com:/share
        nasDirsNeedToCheck.push(path.posix.join(nasMountDir.mountDir, nasMountDir.remoteDir.substring(EXTREME_PATH_PREFIX.length)));
      } else {
        nasDirsNeedToCheck.push(path.posix.join(nasMountDir.mountDir, nasMountDir.remoteDir));
      }
    }

    console.log(`\tChecking if nas directories ${nasRemoteDirs} exists, if not, it will be created automatically`);

    const utilFunctionName = await makeFcUtilsFunctionNasDirChecker(role, vpcConfig, modifiedNasConfig);
    await sleep(1000);
    await invokeFcUtilsFunction({
      functionName: utilFunctionName,
      event: JSON.stringify(nasDirsNeedToCheck)
    });

    console.log(green('\tChecking nas directories done', JSON.stringify(nasRemoteDirs)));
  }
}