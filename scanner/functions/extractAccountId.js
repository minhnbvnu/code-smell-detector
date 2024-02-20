function extractAccountId(endpoint) {
  return extract(/^https?:\/\/([^.]+)\..+$/, endpoint);
}