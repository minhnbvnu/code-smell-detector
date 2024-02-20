function createTestConfiguration(t, testCase) {
  const initialPolicies = testCase.starting_policy_settings
  const initialConfig = Object.assign({}, DEFAULT_CONFIG)

  for (const [policyName, policyValue] of Object.entries(initialPolicies)) {
    const policyMappings = LASP_MAP[policyName]
    const matchingConfigPath = policyMappings.path

    const settingValue = policyMappings.allowedValues[policyValue.enabled ? 1 : 0]

    t.comment(
      `${policyName}.enabled: ${policyValue.enabled} ` + `-> ${matchingConfigPath}: ${settingValue}`
    )

    initConfigurationItem(initialConfig, matchingConfigPath, settingValue)
  }

  return initialConfig
}