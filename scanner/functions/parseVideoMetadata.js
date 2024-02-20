function parseVideoMetadata(data) {
  const result = parseLogMetadata(data);
  result.type = XVIZ_MESSAGE_TYPE.VIDEO_METADATA;

  return result;
}