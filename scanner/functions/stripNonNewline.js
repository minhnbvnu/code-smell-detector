function stripNonNewline(value) {
  return value.replace(reNonNewline, function() {
    return '';
  });
}