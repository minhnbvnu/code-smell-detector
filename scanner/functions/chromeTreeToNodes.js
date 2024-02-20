function chromeTreeToNodes(content) {
  // Note that both startTime and endTime are now in microseconds
  return {
    samples: content.samples,
    startTime: content.startTime * 1000000,
    endTime: content.endTime * 1000000,
    nodes: treeToArray(content.head),
    timeDeltas: timestampsToDeltas(content.timestamps, content.startTime)
  };
}