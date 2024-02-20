function updateSocketRequestParams(timestamp, metadata, bufferLength, bufferRange) {
  const {start_time: logStartTime = -Infinity, end_time: logEndTime = Infinity} = metadata;
  const totalDuration = logEndTime - logStartTime;
  const chunkSize = bufferLength || totalDuration;

  if (!Number.isFinite(totalDuration)) {
    // If there is no start/end time in metadata, buffer length must be supplied
    assert(bufferLength, 'bufferLength is invalid');
  }
  if (chunkSize >= totalDuration) {
    // Unlimited buffer
    return {
      startTimestamp: logStartTime,
      endTimestamp: logEndTime,
      bufferStart: logStartTime,
      bufferEnd: logEndTime
    };
  }

  const bufferStart = Math.max(timestamp - chunkSize / 2, logStartTime);
  const bufferEnd = Math.min(bufferStart + chunkSize, logEndTime);
  const newBufferRange = rangeUtils.subtract([bufferStart, bufferEnd], bufferRange);

  if (newBufferRange.length === 0) {
    return null;
  }
  const start = newBufferRange[0][0];
  const end = newBufferRange[newBufferRange.length - 1][1];

  return {
    startTimestamp: start,
    endTimestamp: end,
    bufferStart,
    bufferEnd
  };
}