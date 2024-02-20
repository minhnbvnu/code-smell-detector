function isImportUrl(href) {
  return /^\.{0,2}\/|^[a-z0-9+]+:/.test(href);
}