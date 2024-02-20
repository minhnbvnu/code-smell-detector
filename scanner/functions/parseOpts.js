function parseOpts(opts) {
  if (typeof opts === 'string') {
    opts = url.parse(opts)
  } else {
    opts = copy.shallow(opts)
  }

  return opts
}