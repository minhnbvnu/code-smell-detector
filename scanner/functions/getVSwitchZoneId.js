async function getVSwitchZoneId(vpcClient, region, vswitchId) {
  const describeRs = await describeVSwitchAttributes(vpcClient, region, vswitchId);
  return (describeRs || {}).ZoneId;
}