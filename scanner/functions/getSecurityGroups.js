async function getSecurityGroups(vpcId) {
  const ecsClient = await getEcsPopClient();
  const profile = await getProfile();
  return await securityGroup.describeSecurityGroups(ecsClient, profile.defaultRegion, vpcId, undefined);
}