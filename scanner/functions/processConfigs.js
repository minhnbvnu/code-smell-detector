function processConfigs(configs = []) {
  return configs.map((config) => {
    validateConfig(config)
    return Object.assign({}, config, {
      allowlist: processDomainList(config.allowlist || []),
      blocklist: processDomainList(config.blocklist || []),
      fuzzylist: processDomainList(config.fuzzylist || []),
      tolerance: ('tolerance' in config) ? config.tolerance : DEFAULT_TOLERANCE
    })
  });
}