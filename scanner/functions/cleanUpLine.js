function cleanUpLine(line) {
  line.parent = null;
  detachMarkedSpans(line);
}