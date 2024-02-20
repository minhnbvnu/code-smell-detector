function serializeTimeRanges(timeRanges = emptyTimeRanges) {
  // @ts-ignore
  return Array.from(timeRanges)
    .map((_, i) => [
      Number(timeRanges.start(i).toFixed(3)),
      Number(timeRanges.end(i).toFixed(3)),
    ].join(':'))
    .join(' ');
}