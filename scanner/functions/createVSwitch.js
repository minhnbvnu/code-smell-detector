async function createVSwitch(vpcClient, {
  region,
  vpcId,
  zoneId,
  vswitchName
}) {
  var params = {
    'RegionId': region,
    'VpcId': vpcId,
    'ZoneId': zoneId,
    'CidrBlock': '10.20.0.0/16',
    'VSwitchName': vswitchName,
    'Description': 'default vswitch created by fc fun'
  };

  debug('createVSwitch params is %j', params);

  const createRs = await vpcClient.request('CreateVSwitch', params, requestOption);

  return createRs.VSwitchId;
}