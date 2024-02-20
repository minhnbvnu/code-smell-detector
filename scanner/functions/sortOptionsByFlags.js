function sortOptionsByFlags(a, b) {
  const aOpt = a.flags.replace(/-/g, '');
  const bOpt = b.flags.replace(/-/g, '');
  return sortAlpha(aOpt, bOpt);
}