function subset(predicate) {
  const subsetFn = subsetPartial(predicate)
  return isoU(subsetFn, subsetFn)
}