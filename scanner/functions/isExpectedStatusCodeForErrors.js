function isExpectedStatusCodeForErrors(config, code) {
  let codes = []
  if (config && config.error_collector && config.error_collector.expected_status_codes) {
    codes = config.error_collector.expected_status_codes
  }
  return codes.indexOf(parseInt(code, 10)) >= 0
}