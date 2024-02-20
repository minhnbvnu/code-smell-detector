function getParentKey(streamName) {
  const i = streamName.indexOf('/', 1);
  if (i > 1) {
    return streamName.slice(0, i);
  }
  return '';
}