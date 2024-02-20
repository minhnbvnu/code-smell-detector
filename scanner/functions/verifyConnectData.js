function verifyConnectData(t, testCase, connectData) {
  t.ok(connectData.security_policies)

  for (const [policyName, expectedPolicy] of Object.entries(testCase.expected_connect_policies)) {
    const actualPolicy = connectData.security_policies[policyName]

    t.ok(actualPolicy)
    t.equal(actualPolicy.enabled, expectedPolicy.enabled)
  }

  for (const [, policyName] of testCase.validate_policies_not_in_connect.entries()) {
    const hasProperty = Object.hasOwnProperty.call(connectData.security_policies, policyName)
    t.notOk(hasProperty)
  }
}