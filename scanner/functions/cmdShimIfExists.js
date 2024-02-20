function cmdShimIfExists (src, to, opts) {
  opts = Object.assign({}, DEFAULT_OPTIONS, opts)
  return fs.stat(src)
    .then(() => cmdShim(src, to, opts))
    .catch(() => {})
}