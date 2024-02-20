function getJSONXVIZType(str) {
  // We are trying to capture
  // "type"\s*:\s*"xviz/transform_point_in_time"
  // which the smallest is 37 bytes. Grab 50
  // to provide room for spacing

  // {"type":"xviz/*"
  let firstChunk = str.slice(0, 50);
  // "type":"xviz/*"}
  let lastChunk = str.slice(-50);

  if (Number.isFinite(firstChunk[0])) {
    firstChunk = String.fromCharCode.apply(null, firstChunk);
    lastChunk = String.fromCharCode.apply(null, lastChunk);
  }

  return getXVIZType(firstChunk, lastChunk);
}