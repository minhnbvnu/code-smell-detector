function isIgnoredStatusCodeForErrors(config, code) {
  let codes = []
  if (config && config.error_collector && config.error_collector.ignore_status_codes) {
    codes = config.error_collector.ignore_status_codes
  }
  return codes.indexOf(parseInt(code, 10)) >= 0
}