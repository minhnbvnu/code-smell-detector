async function describeNasZones(nasClient, region) {
  const params = {
    'RegionId': region
  };

  const zones = await nasClient.request('DescribeZones', params, requestOption);
  return zones.Zones.Zone;
}