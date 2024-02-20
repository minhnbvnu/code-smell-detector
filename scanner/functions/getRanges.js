function getRanges(from, to, limit) {
  const ranges = [];
  while (to - from > limit * limit) {
    limit = limit * limit;
  }
  for (let i = from; i <= to; i += limit) {
    ranges.push({ from: i, to: Math.min(to, i + limit - 1) });
  }

  return ranges;
}