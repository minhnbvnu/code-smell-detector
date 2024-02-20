function stripNSB (code) {
  return code.replace(nonSpacingRegex, '');
}