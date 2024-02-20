async function makeAndAttachPolicy(policyName, policyDocument, roleName) {
  debug('begin makePolicy');
  await makePolicy(policyName, policyDocument);
  debug('begin attachPolicyToRole');
  await attachPolicyToRole(policyName, roleName, 'Custom');
}