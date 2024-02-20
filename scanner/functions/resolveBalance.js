function resolveBalance(lastSynced, conflictedBalances) {
  return Object.keys(lastSynced).reduce((balance, code) => {
    balance[code] =
      lastSynced[code] +
      conflictedBalances.reduce(
        (delta, conflicted) => delta + (conflicted[code] - lastSynced[code]),
        0
      );
    return balance;
  }, {});
}