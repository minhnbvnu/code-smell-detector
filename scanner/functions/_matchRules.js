function _matchRules(rules, key) {
  if (rules.exact && rules.exact.test(key)) {
    return EXACT_MATCH
  }

  const wildcard = rules.wildcard
  if (!wildcard) {
    return NO_MATCH
  }

  wildcard.lastIndex = 0
  return wildcard.test(key) ? wildcard.lastIndex + 1 : NO_MATCH
}