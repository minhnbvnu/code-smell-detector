async function createVpc(vpcClient, region, vpcName) {
  var createParams = {
    'RegionId': region,
    'CidrBlock': '10.0.0.0/8',
    'EnableIpv6': false,
    'VpcName': vpcName,
    'Description': 'default vpc created by fc fun'
  };

  var createRs;

  try {

    createRs = await vpcClient.request('CreateVpc', createParams, requestOption);
    
  } catch (ex) {
    throw ex;
  }

  const vpcId = createRs.VpcId;

  debug('create vpc rs is: %j', createRs);

  await waitVpcUntilAvaliable(vpcClient, region, vpcId);

  return vpcId;
}