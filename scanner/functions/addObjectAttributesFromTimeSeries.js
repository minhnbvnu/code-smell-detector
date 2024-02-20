function addObjectAttributesFromTimeSeries(streamName, entries) {
  // Get last part of name or use full name
  const mark = streamName.lastIndexOf('/');
  let attribute = streamName;
  if (mark !== -1) {
    attribute = `${streamName.substring(mark + 1)}`;
  }

  for (const entry of entries) {
    const xvizObject = XVIZObject.get(entry.id);
    if (xvizObject) {
      xvizObject._setAttribute(streamName, attribute, entry.variable);
    }
  }
}