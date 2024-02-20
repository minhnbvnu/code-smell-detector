function parseLogMetadataV2(data) {
  // streams is the map from stream names (ie streams) to the url resource
  const originalStreams = data.streams;

  // Use XVIZ configuration to filter out unwanted / blacklisted streams
  const {STREAM_BLACKLIST} = getXVIZConfig();
  const streams = {};
  if (originalStreams) {
    Object.keys(originalStreams).forEach(streamName => {
      if (!STREAM_BLACKLIST.has(streamName)) {
        streams[streamName] = originalStreams[streamName];
      }
    });
  }

  const logInfo = data.log_info || {};
  const {logStartTime, logEndTime, eventStartTime, eventEndTime} = getTimestamps(logInfo);
  const styles = collectStreamStyles(streams);

  const metadata = {
    ...data,

    streams, // Overrides entry from 'data'

    logStartTime,
    logEndTime,

    start_time: eventStartTime, // eslint-disable-line camelcase
    end_time: eventEndTime, // eslint-disable-line camelcase

    // TODO: i don't think these are ever used
    eventStartTime,
    eventEndTime,

    styles
  };

  return metadata;
}