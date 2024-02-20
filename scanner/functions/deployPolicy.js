async function deployPolicy(resourceName, roleName, policy, curCount, product = 'Fc') {
  if (typeof policy === 'string') {
    await attachPolicyToRole(policy, roleName);
    return curCount;
  }

  const profile = await getProfile();

  const policyName = normalizeRoleOrPoliceName(`Aliyun${product}GeneratedServicePolicy-${profile.defaultRegion}-${resourceName}${curCount}`);

  await makeAndAttachPolicy(policyName, policy, roleName);

  return curCount + 1;
}