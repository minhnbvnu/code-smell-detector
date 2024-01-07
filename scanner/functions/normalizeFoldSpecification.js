function normalizeFoldSpecification(spec) {
  if (spec.type) {
    if (Array.isArray(spec.type)) {
      spec.matchers = spec.type.map(matcherForSpec);
    } else {
      spec.matchers = [matcherForSpec(spec.type)];
    }
  }

  if (spec.start) normalizeFoldSpecification(spec.start);
  if (spec.end) normalizeFoldSpecification(spec.end);
}