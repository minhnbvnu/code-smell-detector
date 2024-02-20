function opt_okay(opts, key) {
  return opts.hasOwnProperty(key) && typeof opts[key] === 'string'
}