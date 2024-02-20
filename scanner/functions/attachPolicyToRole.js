async function attachPolicyToRole(policyName, roleName, policyType = 'System') { 
  const ram = await getRamClient();

  await promiseRetry(async (retry, times) => {
    try {
      const policies = await ram.listPoliciesForRole({
        RoleName: roleName
      });
      var policy = policies.Policies.Policy.find((item) => {
        return _.toLower(item.PolicyName) === _.toLower(policyName);
      });
      if (!policy) {
        await ram.attachPolicyToRole({
          PolicyType: policyType,
          PolicyName: policyName,
          RoleName: roleName
        });
      }
    } catch (ex) {
      if (ex.code && ex.code === 'NoPermission') {
        throw ex;
      }
      debug('error when attachPolicyToRole: %s, policyName %s, error is: \n%O', roleName, policyName, ex);

      console.log(red(`retry ${times} times`));
      retry(ex);
    }
  });
}