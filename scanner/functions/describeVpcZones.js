async function describeVpcZones(vpcClient, region) {
  const params = {
    'RegionId': region
  };

  const zones = await vpcClient.request('DescribeZones', params, requestOption);
  return zones.Zones.Zone;
}