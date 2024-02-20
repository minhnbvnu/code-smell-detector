function parseStreamSet(data, convertPrimitive) {
  const {update_type, updates} = data;
  const updateType = STATE_UPDATE_TYPE[update_type.toUpperCase()];

  if (!updateType) {
    log.error(`update_type of "${update_type}" is not supported.`)();
    return {type: XVIZ_MESSAGE_TYPE.INCOMPLETE, message: 'Unsupported update type'};
  }

  if (!updates) {
    return {type: XVIZ_MESSAGE_TYPE.INCOMPLETE, message: 'Missing required "updates" property'};
  }

  if (updates && updates.length === 0) {
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE,
      message: 'Property "updates" has length of 0, no data?'
    };
  }

  if (updates.length > 1) {
    log.warn(
      `Only XVIZ first update of "snapshot" is currently supported. Current updates has "${
        updates.length
      }" entries.`
    )();
  }

  const streamSets = updates;

  let timestamp = null;
  if (streamSets) {
    timestamp = streamSets.reduce((t, stateUpdate) => {
      if (!t) {
        return stateUpdate && stateUpdate.timestamp;
      }
      return Math.max(t, stateUpdate.timestamp);
    }, null);
  }

  if (!Number.isFinite(timestamp)) {
    // Incomplete stream message, just tag it accordingly so client can ignore it
    return {type: XVIZ_MESSAGE_TYPE.INCOMPLETE, message: 'Missing timestamp in "updates"'};
  }

  const result = {
    type: XVIZ_MESSAGE_TYPE.TIMESLICE,
    updateType,
    poses: {},
    streams: {},
    links: {},
    timestamp
    // TODO/Xintong validate primary vehicle pose in each update?
  };

  if (streamSets) {
    const {poses, streams, links} = parseStreamSets(streamSets, timestamp, convertPrimitive);
    Object.assign(result.poses, poses);
    Object.assign(result.streams, streams);
    Object.assign(result.links, links);
  }

  return result;
}