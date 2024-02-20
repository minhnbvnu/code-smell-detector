function adjustMatchers(matchers) {
  var adjustedMatchers = [];
  if (isDefined(matchers)) {
    forEach(matchers, function(matcher) {
      adjustedMatchers.push(adjustMatcher(matcher));
    });
  }
  return adjustedMatchers;
}