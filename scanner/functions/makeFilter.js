function makeFilter(rules) {
  const config = makeAttributeFilterConfig(rules)
  config.attributes.filter_cache_limit = 1000
  return new AttributeFilter(config)
}