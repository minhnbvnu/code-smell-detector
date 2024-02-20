function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
}