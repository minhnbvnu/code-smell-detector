function language(lookups, matchComparison) {
  return function(selector) {
    return parse(selector, remap(lookups),
                 matchComparison || caseSensitiveComparison)
  }
}