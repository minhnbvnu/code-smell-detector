function ensureUriEncoded(text) {
  return String(text).replace(nonUrlSafeCharsRgx, encodeURIComponent);
}