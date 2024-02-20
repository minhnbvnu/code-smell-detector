async function createDefaultVpcIfNotExist() {
  const profile = await getProfile();
  const region = profile.defaultRegion;

  const vpcClient = await getVpcPopClient();
  const ecsClient = await getEcsPopClient();

  const defaultVpcName = 'fc-fun-vpc';

  let vswitchIds;
  let vpcId;

  const funDefaultVpc = await findVpc(vpcClient, region, defaultVpcName);

  if (funDefaultVpc) { // update
    vswitchIds = funDefaultVpc.VSwitchIds.VSwitchId;
    vpcId = funDefaultVpc.VpcId;

    console.log(green('\t\tvpc already generated, vpcId is: ' + vpcId));
  } else { // create
    console.log('\t\tcould not find default vpc, ready to generate one');
    vpcId = await createVpc(vpcClient, region, defaultVpcName);
    console.log(green('\t\tdefault vpc has been generated, vpcId is: ' + vpcId));
  }

  debug('vpcId is %s', vpcId);

  const vswitchId = await createDefaultVSwitchIfNotExist(vpcClient, region, vpcId, vswitchIds);

  vswitchIds = [ vswitchId ];
  // create security
  const securityGroupId = await createDefaultSecurityGroupIfNotExist(ecsClient, region, vpcId);

  return {
    vpcId,
    vswitchIds,
    securityGroupId
  };
}