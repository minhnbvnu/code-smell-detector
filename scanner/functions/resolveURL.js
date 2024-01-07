function resolveUrl(base, url) {
  if (url.includes('://')) {
    return url;
  }
  return new URL(url, base).href;
}