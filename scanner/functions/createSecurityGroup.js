async function createSecurityGroup(ecsClient, region, vpcId, securityGroupName) {
  var params = {
    'RegionId': region,
    'SecurityGroupName': securityGroupName,
    'Description': 'default security group created by fc fun',
    'VpcId': vpcId,
    'SecurityGroupType': 'normal'
  };

  var createRs;

  try {
    
    createRs = await ecsClient.request('CreateSecurityGroup', params, requestOption);

  } catch (ex) {
    throw ex;
  }

  return createRs.SecurityGroupId;
}