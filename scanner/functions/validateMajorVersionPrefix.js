function validateMajorVersionPrefix(possibleMajorPrefix) {
  let prefix;

  if (possibleMajorPrefix) {
    prefix = possibleMajorPrefix.match(/^[+-]?([0-9]+)/);
  }
  return prefix && prefix.length > 0 ? prefix[0] : '';
}