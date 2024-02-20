function postDeserialize(message) {
  if (message.type !== XVIZ_MESSAGE_TYPE.TIMESLICE) {
    return message;
  }

  const {OBJECT_STREAM} = getXVIZConfig();
  const {streams, timestamp} = message;

  // OBJECT_STREAM is deprecated, only keeping for backward compatibility
  if (OBJECT_STREAM) {
    observeObjects(streams[OBJECT_STREAM], timestamp);
    return message;
  }

  for (const streamName in streams) {
    const objects = streams[streamName];
    if (objects && objects.features && objects.features.length && objects.features[0].id) {
      observeObjects(objects, timestamp);
    }
  }
  return message;
}