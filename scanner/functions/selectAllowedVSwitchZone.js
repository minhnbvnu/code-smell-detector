async function selectAllowedVSwitchZone(vpcClient, region) {
  const nasClient = await getNasPopClient();

  const fcAllowedZones = await getFcAllowedZones();
  const vpcZones = await describeVpcZones(vpcClient, region);
  const nasZones = await require('./nas').describeNasZones(nasClient, region);

  const usedZoneId = await selectVSwitchZoneId(fcAllowedZones, vpcZones, nasZones);

  if (!usedZoneId) {
    throw new Error('no availiable zone for vswitch');
  }

  debug('select allowed switch zone: ', usedZoneId);

  return usedZoneId;
}