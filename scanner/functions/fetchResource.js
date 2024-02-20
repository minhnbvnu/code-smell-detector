function fetchResource(res, lang) {
  const url = res.replace('{locale}', lang);
  return load(url).catch(() => null);
}