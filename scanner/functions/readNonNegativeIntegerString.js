function readNonNegativeIntegerString(string) {
  const m = /^\s*(\d+)\s*$/.exec(string);
  if (m) {
    return parseInt(m[1], 10);
  }
  return undefined;
}