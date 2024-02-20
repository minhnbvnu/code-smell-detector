function verifyEndingConfigPolicySettings(t, testCase, config) {
  for (const [policyName, policyValue] of Object.entries(testCase.ending_policy_settings)) {
    const matchingConfigPath = LASP_MAP[policyName].path

    const nestedSettingNames = matchingConfigPath.split('.')
    let value = null
    nestedSettingNames.forEach((settingName, index) => {
      if (index === 0) {
        value = config[settingName]
        return
      }

      value = value ? value[settingName] : value
    })

    // Translate back from config value to lasp value
    const allowedIndex = LASP_MAP[policyName].allowedValues.indexOf(value)
    const actual = allowedIndex >= 0 ? Boolean(allowedIndex) : value
    const expected = policyValue.enabled

    t.equal(actual, expected)
  }
}