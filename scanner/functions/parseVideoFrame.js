function parseVideoFrame(arrayBuffer) {
  const view = new DataView(arrayBuffer);

  // Read off version
  const result = {type: XVIZ_MESSAGE_TYPE.VIDEO_FRAME};
  const littleEndian = true;
  const utf8Decoder = new TextDecoder('utf-8');

  // Check version
  let offset = 0;
  result.version = view.getUint32(offset, littleEndian);
  offset += 4;
  result.versionFlags = view.getUint32(offset, littleEndian);
  offset += 4;

  // Read off stream name
  const streamLength = view.getUint32(offset, littleEndian);
  const stringStart = offset + 4;
  offset += 4 + streamLength;

  result.stream = utf8Decoder.decode(arrayBuffer.slice(stringStart, offset));

  // Read off timestamp
  result.timestamp = view.getFloat64(offset, littleEndian);
  offset += 8;

  // Read slice off the image data
  const imageSize = view.getUint32(offset, littleEndian);
  offset += 4;

  result.imageData = arrayBuffer.slice(offset, offset + imageSize);
  result.imageType = 'image/jpeg';

  return result;
}