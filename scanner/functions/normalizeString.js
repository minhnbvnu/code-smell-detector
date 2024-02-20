function normalizeString (config) {
  return typeof config === 'string' ? { name: config, options: {} } : config
}