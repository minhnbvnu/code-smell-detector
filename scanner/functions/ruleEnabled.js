function ruleEnabled(coreRule, rules) {
  let ruleValue
  if (rules && !Array.isArray(rules[coreRule.ruleId])) {
    ruleValue = rules[coreRule.ruleId]
  } else if (rules && Array.isArray(rules[coreRule.ruleId])) {
    ruleValue = rules[coreRule.ruleId][0]
  }

  if (
    rules &&
    rules[coreRule.ruleId] !== undefined &&
    ruleValue &&
    validSeverityMap.includes(ruleValue)
  ) {
    return coreRule
  }
}