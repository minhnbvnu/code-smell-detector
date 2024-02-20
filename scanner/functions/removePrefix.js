function removePrefix(pattern, prefix) {
  if (pattern.startsWith(prefix)) {
    pattern = pattern.slice(prefix.length);
  }

  return pattern;
}