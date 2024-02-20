async function deployPolicies(resourceName, roleName, policies, product) {

  let nextCount = 1;

  if (Array.isArray(policies)) {
    for (let policy of policies) {
      nextCount = await deployPolicy(resourceName, roleName, policy, nextCount, product);
    }
  } else {
    nextCount = await deployPolicy(resourceName, roleName, policies, nextCount, product);
  }
}