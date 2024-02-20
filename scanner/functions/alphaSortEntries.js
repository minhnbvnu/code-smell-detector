function alphaSortEntries(entryA, entryB) {
  const a = entryA[0];
  const b = entryB[0];

  if (String(+a) === a) {
    if (String(+b) !== b) {
      return -1;
    }

    return +a < +b ? -1 : 1;
  }

  return a < b ? -1 : 1;
}