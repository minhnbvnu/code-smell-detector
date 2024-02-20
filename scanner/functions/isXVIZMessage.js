function isXVIZMessage(data) {
  switch (getDataContainer(data)) {
    case 'binary':
      if (isBinaryXVIZ(data)) {
        return true;
      }
      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }
      return getJSONXVIZType(data) !== null;

    case 'string':
      return getJSONXVIZType(data) !== null;

    case 'object':
      return data.type ? getObjectXVIZType(data.type) !== null : false;

    default:
  }
  return false;
}