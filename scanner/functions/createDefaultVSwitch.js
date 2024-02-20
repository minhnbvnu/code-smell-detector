async function createDefaultVSwitch(vpcClient, region, vpcId, vswitchName) {
  const vswitchZoneId = await selectAllowedVSwitchZone(vpcClient, region);

  var vswitchId;
  try {
    // 创建 vswitch
    vswitchId = await createVSwitch(vpcClient, {
      region,
      vpcId,
      zoneId: vswitchZoneId,
      vswitchName: vswitchName
    });
  } catch (ex) {
    throw ex;
  }
  return vswitchId;
}