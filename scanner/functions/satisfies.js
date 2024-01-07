function satisfies(version, rawRange) {
  let parsedRange;
  if (!(parsedRange = cache.ranges[rawRange])) {
    parsedRange = new Range(rawRange);
    cache.ranges[rawRange] = parsedRange;
  }
  return parsedRange.test(version);
}