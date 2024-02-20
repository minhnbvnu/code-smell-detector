function fillStats(stats, bigint) {
  const target = bigint ? bigintStatValues : statValues;
  for (let i = 0; i < 36; i++) {
    target[i] = stats[i];
  }
}