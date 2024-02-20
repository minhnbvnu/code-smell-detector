async function deletePolicyNotDefaultVersion(ram, policyName) {
  const listResponse = await ram.listPolicyVersions({
    PolicyType: 'Custom',
    PolicyName: policyName
  });
    
  const versions = (listResponse.PolicyVersions || {}).PolicyVersion;
  if (versions) {
    for (let version of versions) {
      if (version.IsDefaultVersion === false) {
        await ram.deletePolicyVersion({
          PolicyName: policyName,
          VersionId: version.VersionId
        });
      }
    }
  }
}