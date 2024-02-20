function removeSuffix(pattern, suffix) {
  if (pattern.endsWith(suffix)) {
    return pattern.slice(0, -suffix.length);
  }

  return pattern;
}