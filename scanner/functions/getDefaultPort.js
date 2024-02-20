function getDefaultPort(opts) {
  return !opts.protocol || opts.protocol === 'http:' ? DEFAULT_HTTP_PORT : DEFAULT_SSL_PORT
}