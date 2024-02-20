function onAppliedRule(rule, newValue, oldValue) {
    appliedRules.push({
      rule: rule,
      original: oldValue,
      normalized: newValue
    })
  }