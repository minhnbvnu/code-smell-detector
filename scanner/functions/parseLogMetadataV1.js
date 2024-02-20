function parseLogMetadataV1(data) {
  // streams is the map from stream names (ie streams) to the url resource
  const originalStreams = data.streams || [];

  // Use XVIZ configuration to filter out unwanted / blacklisted streams
  const {STREAM_BLACKLIST} = getXVIZConfig();
  const streams = {};
  Object.keys(originalStreams).forEach(streamName => {
    if (!STREAM_BLACKLIST.has(streamName)) {
      streams[streamName] = originalStreams[streamName];
    }
  });

  const {logStartTime, logEndTime, eventStartTime, eventEndTime} = getTimestamps(data);

  const metadata = {
    ...data,

    streams,

    logStartTime,
    logEndTime,

    eventStartTime,
    eventEndTime
  };

  return metadata;
}