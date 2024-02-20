function getXVIZMessageType(data) {
  switch (getDataContainer(data)) {
    case 'binary':
      if (isGLBXVIZ(data)) {
        return getGLBXVIZType(data);
      } else if (isPBEXVIZ(data)) {
        return getPBEXVIZType(data);
      }
      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }
      return getJSONXVIZType(data);

    case 'string':
      return getJSONXVIZType(data);

    case 'object':
      return data.type ? getObjectXVIZType(data.type) : null;

    default:
  }
  return null;
}