function arrayContainsDates(value) {
  const n = Math.min(nChecks, value.length);
  if (!(n > 0)) return false;
  let hasDate = false; // ensure we encounter 1+ dates
  for (let i = 0; i < n; ++i) {
    const v = value[i];
    if (v == null) continue; // ignore null and undefined
    if (!(v instanceof Date)) return false;
    hasDate = true;
  }
  return hasDate;
}