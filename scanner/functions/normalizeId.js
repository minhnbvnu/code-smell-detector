function normalizeId(id) {
  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
}