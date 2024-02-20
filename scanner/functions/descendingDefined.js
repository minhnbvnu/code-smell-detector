function descendingDefined(a, b) {
  return defined(a, b) || (a > b ? -1 : a < b ? 1 : 0);
}