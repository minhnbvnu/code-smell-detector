function isNaNComparison(left, right) {
  return fu.any(isNaNIdentifier, [left, right])
}