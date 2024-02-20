function __config (opts) {
  merge(opts, config)

  report = debounce(config.report, config.delay, function () {
    errorList = []
  })
}