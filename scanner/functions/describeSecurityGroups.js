async function describeSecurityGroups(client, region, vpcId, securityGroupName) {
  var params = {
    'RegionId': region,
    'VpcId': vpcId
  };

  if (securityGroupName) {
    Object.assign(params, {
      'SecurityGroupName': securityGroupName
    });
  }
  const describeRs = await client.request('DescribeSecurityGroups', params, requestOption);

  const securityGroup = describeRs.SecurityGroups.SecurityGroup;

  return securityGroup;
}