function parseStreamVideoData(data) {
  if (data instanceof ArrayBuffer) {
    return parseVideoFrame(data);
  }
  if (data.type === 'metadata') {
    return parseVideoMetadata(data);
  }
  // Unknown message
  return {type: XVIZ_MESSAGE_TYPE.ERROR, message: 'Unknown stream data type', data};
}