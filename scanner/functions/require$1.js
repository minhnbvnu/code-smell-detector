function require$1 (url) {
  if (JSMODULE_REG.test(url)) {
    return getAndCache(url)
  }
}