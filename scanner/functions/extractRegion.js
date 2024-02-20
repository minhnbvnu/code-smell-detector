function extractRegion(endpoint) {
  return extract(/^https?:\/\/[^.]+\.([^.]+)\..+$/, endpoint);
}