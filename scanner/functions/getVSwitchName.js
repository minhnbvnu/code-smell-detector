async function getVSwitchName(vpcClient, region, vswitchId) {
  const describeRs = await describeVSwitchAttributes(vpcClient, region, vswitchId);
  return (describeRs || {}).VSwitchName;
}