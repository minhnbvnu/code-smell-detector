function addSuffix(pattern, suffix) {
  if (!pattern.endsWith(suffix)) {
    return pattern + suffix;
  }

  return pattern;
}