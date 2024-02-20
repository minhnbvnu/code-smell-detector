async function generateAutoNasConfig(serviceName, vpcId, vswitchIds, userId, groupId) {
  const mountPointDomain = await createDefaultNasIfNotExist(vpcId, vswitchIds);

  //fun nas 创建的服务名比其对应的服务多了 '_FUN_NAS_' 前缀
  //对于 nas 的挂载目录，要去掉这个前缀，保证 fun nas 的服务与对应的服务使用的是同样的挂载目录
  if (serviceName.startsWith(constants.FUN_NAS_SERVICE_PREFIX)) {
    serviceName = serviceName.substring(constants.FUN_NAS_SERVICE_PREFIX.length);
  }
  return {
    UserId: userId || 10003,
    GroupId: groupId || 10003,
    MountPoints: [
      {
        ServerAddr: `${mountPointDomain}:/${serviceName}`,
        MountDir: '/mnt/auto'
      }
    ]
  };
}