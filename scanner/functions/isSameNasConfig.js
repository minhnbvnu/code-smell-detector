async function isSameNasConfig(serviceName, nasConfig) {
  let curNasServerNasConfig;
  try {
    curNasServerNasConfig = await getNasConfig(serviceName);
    curNasServerNasConfig = {
      UserId: curNasServerNasConfig.userId,
      GroupId: curNasServerNasConfig.groupId,
      MountPoints: curNasServerNasConfig.mountPoints.map(p => ({ ServerAddr: p.serverAddr, MountDir: p.mountDir }))
    };
  } catch (error) {
    curNasServerNasConfig = {};
  }

  if (isNasAutoConfig(nasConfig)) {
    // 当线上函数计算端的 NasConfig 包含如下几个选项时，对应本地 NasConfig: Auto
    // UserId: 10003,
    // GroupId: 10003,
    // MountDir: /mnt/auto
    // 当本地 NasConfig 为 Auto 时，认为 nas 配置未变
    return _.isEqual(curNasServerNasConfig.UserId, nasConfig.UserId || 10003) &&
          _.isEqual(curNasServerNasConfig.GroupId, nasConfig.GroupId || 10003) &&
          _.isEqual(curNasServerNasConfig.MountPoints[0].MountDir, '/mnt/auto');
  }
  return _.isEqual(nasConfig, curNasServerNasConfig);
}