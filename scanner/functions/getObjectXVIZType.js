function getObjectXVIZType(type) {
  const match = type.match(XVIZ_TYPE_VALUE_PATTERN);
  if (match) {
    return match[0];
  }

  return null;
}