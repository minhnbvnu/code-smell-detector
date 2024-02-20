function getSupportedRuntimes(ignoredRuntimes) {
  return supportedRuntimes.filter((r) => !(ignoredRuntimes || []).includes(r));
}