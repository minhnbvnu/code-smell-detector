function matcherForSelector(selector) {
  const parts = parse(selector);
  if (typeof parts === 'function') return parts;
  return selector ? scope => isSubset(parts, parse(scope)) : always;
}