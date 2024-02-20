function cmdShim (src, to, opts) {
  opts = Object.assign({}, DEFAULT_OPTIONS, opts)
  return fs.stat(src)
    .then(() => cmdShim_(src, to, opts))
}