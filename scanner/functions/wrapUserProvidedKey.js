function wrapUserProvidedKey(key) {
  return '$' + escapeUserProvidedKey(key);
}