async function findMountTarget(nasClient, region, fileSystemId, vpcId, vswitchId) {
  var params = {
    'RegionId': region,
    'FileSystemId': fileSystemId
  };

  const rs = await nasClient.request('DescribeMountTargets', params, requestOption);

  const mountTargets = rs.MountTargets.MountTarget;

  // todo: 检查 mountTargets 的 vswitch 是否与函数计算的一致？

  if (!_.isEmpty(mountTargets)) {

    const mountTarget = _.find(mountTargets, {
      'VpcId': vpcId,
      'VswId': vswitchId
    });

    if (mountTarget) {
      return mountTarget.MountTargetDomain;
    }
  }

  return null;
}