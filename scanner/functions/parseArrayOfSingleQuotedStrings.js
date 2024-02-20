function parseArrayOfSingleQuotedStrings(str) {
  return str
    .replace(/^\[|\]$/g, '')
    .split(/,\s+/)
    .map(parseSingleQuotedString);
}