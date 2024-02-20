function loadUserNormalizer(config, rules) {
  // Load the normalizer.
  const normalizer = new MetricNormalizer(config, 'user')
  normalizer.loadFromConfig()

  if (rules && rules.length) {
    rules.forEach(function forEachRule(rule) {
      // Add the rule like `API#addNamingRule` would.
      normalizer.addSimple(rule[0], '/' + rule[1])
    })
  }

  return normalizer
}