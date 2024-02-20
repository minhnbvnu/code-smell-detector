async function convertToFcAllowedZones(vpcClient, region, vswitchIds) {
  const fcAllowedZones = await getFcAllowedZones();

  const fcZones = [];
  for (const vswitchId of vswitchIds) {
    const zoneId = await getVSwitchZoneId(vpcClient, region, vswitchId);
    if (_.includes(fcAllowedZones, zoneId)) {
      fcZones.push({ zoneId, vswitchId });
    }
  }
  if (_.isEmpty(fcZones)) {
    throw new Error(`
Only zoneId ${fcAllowedZones} of vswitch is allowed by VpcConfig.
Check your vswitch zoneId please.`);
  }

  return fcZones;
}