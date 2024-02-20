function parseStreamFutures(objects, streamName, time, convertPrimitive) {
  const {currentMajorVersion, DYNAMIC_STREAM_METADATA} = getXVIZConfig();

  const result =
    currentMajorVersion === 1
      ? parseStreamFuturesV1(objects, streamName, time, convertPrimitive)
      : parseStreamFuturesV2(objects, streamName, time, convertPrimitive);

  if (DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'FUTURE_INSTANCE',
      primitive_type: result.lookAheads[0][0] && result.lookAheads[0][0].type
    };
  }

  return result;
}