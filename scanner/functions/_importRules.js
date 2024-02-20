function _importRules(rules) {
  const out = {
    exact: null,
    wildcard: null
  }
  const exactRules = []
  const wildcardRules = []
  rules.forEach(function separateRules(rule) {
    if (rule[rule.length - 1] === '*') {
      wildcardRules.push(rule)
    } else {
      exactRules.push(rule)
    }
  })

  if (exactRules.length) {
    out.exact = new RegExp('^' + _convertRulesToRegex(exactRules) + '$')
  }
  if (wildcardRules.length) {
    // The 'g' option is what makes the RegExp set `lastIndex` which we use to
    // test the strength of the match.
    out.wildcard = new RegExp('^' + _convertRulesToRegex(wildcardRules), 'g')
  }
  return out
}