function getXVIZType(firstChunk, lastChunk) {
  let result = firstChunk.match(XVIZ_TYPE_PATTERN);
  if (!result && lastChunk) {
    result = lastChunk.match(XVIZ_TYPE_PATTERN);
  }

  if (result) {
    // return the first match group which contains the type
    return result[1];
  }

  return null;
}