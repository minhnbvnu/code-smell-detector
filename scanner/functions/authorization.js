function authorization (options) {
  return 'AWS ' + options.key + ':' + sign(options)
}