function isJSONString(str) {
  if (str instanceof Uint8Array) {
    return isJSONStringTypeArray(str);
  }

  if (typeof str === 'object') {
    return false;
  }

  const beginning = str.slice(0, 5).trim();
  const end = str.slice(-5).trim();

  return (
    (beginning.startsWith('{') && end.endsWith('}')) ||
    (beginning.startsWith('[') && end.endsWith(']'))
  );
}