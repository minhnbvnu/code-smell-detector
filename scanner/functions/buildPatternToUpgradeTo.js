function buildPatternToUpgradeTo(dep, flags) {
  if (dep.latest === 'exotic') {
    return `${dep.name}@${dep.url}`;
  }

  const toLatest = flags.latest;
  const toVersion = toLatest ? dep.latest : dep.range;
  let rangeOperator = '';

  if (toLatest) {
    if (flags.caret) {
      rangeOperator = '^';
    } else if (flags.tilde) {
      rangeOperator = '~';
    } else if (flags.exact) {
      rangeOperator = '';
    } else {
      rangeOperator = getRangeOperator(dep.range);
    }
  }

  return `${dep.name}@${rangeOperator}${toVersion}`;
}