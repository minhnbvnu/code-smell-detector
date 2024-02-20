function visualLine(line) {
  var merged;
  while (merged = collapsedSpanAtStart(line))
    { line = merged.find(-1, true).line; }
  return line
}