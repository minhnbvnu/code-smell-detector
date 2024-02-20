function resolveMountPoint(mountPoint) {
  // '012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com:/'
  const serverAddr = mountPoint.ServerAddr;
  const mountDir = mountPoint.MountDir;

  // valid serverAddr
  if (!serverAddrReGe.test(serverAddr)) {
    throw new Error(`NasConfig's nas server address '${serverAddr}' doesn't match expected format (allowed: '^[a-z0-9-.]*.nas.[a-z]+.com:/')`);
  }

  const suffix = '.com:';
  const index = serverAddr.lastIndexOf(suffix);

  // /
  let mountSource = serverAddr.substr(index + suffix.length);
  // 012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com
  let serverPath = serverAddr.substr(0, serverAddr.length - mountSource.length - 1);

  return {
    serverPath,
    mountSource,
    mountDir,
    serverAddr
  };
}