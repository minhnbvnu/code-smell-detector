async function createMountTarget(nasClient, region, fileSystemId, vpcId, vswitchId) {
  const params = {
    'RegionId': region,
    'NetworkType': 'Vpc',
    'FileSystemId': fileSystemId,
    'AccessGroupName': 'DEFAULT_VPC_GROUP_NAME',
    'VpcId': vpcId,
    'VSwitchId': vswitchId
  };

  const rs = await nasClient.request('CreateMountTarget', params, requestOption);

  const mountTargetDomain = rs.MountTargetDomain;

  debug('create mount target rs: %s', mountTargetDomain);

  await waitMountPointUntilAvaliable(nasClient, region, fileSystemId, mountTargetDomain);

  return mountTargetDomain;
}