function xId(obj, defaultKey) {
  return String(obj && obj.$id || defaultKey);
}