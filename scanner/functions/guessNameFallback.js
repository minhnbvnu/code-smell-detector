function guessNameFallback(source) {
  // If cannot parse as url, just return cleaned up last part
  const parts = source.split('/');
  return cleanup(parts[parts.length - 1]);
}