function parseStreamVariable(objects, streamName, time) {
  const {currentMajorVersion, DYNAMIC_STREAM_METADATA} = getXVIZConfig();

  const result =
    currentMajorVersion === 1
      ? parseStreamVariableV1(objects, streamName, time)
      : parseStreamVariableV2(objects, streamName, time);

  if (DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'VARIABLE',
      scalar_type: Array.isArray(result.variable) && result.variable[0] && result.variable[0].type
    };
  }

  return result;
}