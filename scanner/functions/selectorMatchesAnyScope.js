function selectorMatchesAnyScope(selector, scopes) {
  return !selector || scopes.some(matcherForSelector(selector));
}