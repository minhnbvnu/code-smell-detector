async function createDefaultSecurityGroupIfNotExist(ecsClient, region, vpcId) {
  // check fun default security group exist?
  let defaultSecurityGroup = await securityGroup.describeSecurityGroups(ecsClient, region, vpcId, defaultSecurityGroupName);
  debug('default security grpup: %j', defaultSecurityGroup);

  // create security group
  if (_.isEmpty(defaultSecurityGroup)) {

    console.log('\t\tcould not find default security group, ready to generate one');

    const securityGroupId = await securityGroup.createSecurityGroup(ecsClient, region, vpcId, defaultSecurityGroupName);

    console.log('\t\t\tsetting default security group rules');

    await securityGroup.authDefaultSecurityGroupRules(ecsClient, region, securityGroupId);

    console.log(green('\t\t\tdefault security group rules has been generated'));

    console.log(green('\t\tdefault security group has been generated, security group is: ' + securityGroupId));

    return securityGroupId;
  }
  const securityGroupId = defaultSecurityGroup[0].SecurityGroupId;

  console.log(green('\t\tsecurity group already generated, security group is: ' + securityGroupId));

  return securityGroupId;
}