function getGLBXVIZType(arraybuffer) {
  const jsonBuffer = getGLBXVIZJSONBuffer(arraybuffer);
  if (!jsonBuffer) {
    return null;
  }

  // We have no choice but to decode the JSON portion of the buffer
  // since it also contains all the GLB headers. This means we do not
  // have any meaningful limits for where to search for the 'type' string
  const textDecoder = new TextDecoder('utf8');
  const jsonString = textDecoder.decode(jsonBuffer);

  return getXVIZType(jsonString);
}