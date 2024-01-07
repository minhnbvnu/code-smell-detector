function getOriginalIndex(matchIndex, diffs = null) {
  if (!diffs) {
    return matchIndex;
  }

  let totalDiff = 0;

  for (const [index, diff] of diffs) {
    const currentIndex = index + totalDiff;

    if (currentIndex >= matchIndex) {
      break;
    }

    if (currentIndex + diff > matchIndex) {
      totalDiff += matchIndex - currentIndex;
      break;
    }

    totalDiff += diff;
  }

  return matchIndex - totalDiff;
}