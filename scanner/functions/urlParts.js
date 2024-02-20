function urlParts(requestUrl) {
  const normalizedUrl = (0, (_normalizeUrl || _load_normalizeUrl()).default)(requestUrl);
  const parsed = url.parse(normalizedUrl);
  const host = parsed.host || '';
  const path = parsed.path || '';
  return { host, path };
}