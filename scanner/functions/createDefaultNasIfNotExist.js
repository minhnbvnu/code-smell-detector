async function createDefaultNasIfNotExist(vpcId, vswitchIds) {
  const nasClient = await getNasPopClient();
  const vpcClient = await getVpcPopClient();

  const profile = await getProfile();
  const region = profile.defaultRegion;

  const nasZones = await describeNasZones(nasClient, region);

  const { zoneId, vswitchId, storageType } = await getAvailableVSwitchId(vpcClient, region, vswitchIds, nasZones);

  const fileSystemId = await createNasFileSystemIfNotExist(nasClient, region, zoneId, storageType);

  debug('fileSystemId: %s', fileSystemId);

  return await createMountTargetIfNotExist(nasClient, region, fileSystemId, vpcId, vswitchId);
}