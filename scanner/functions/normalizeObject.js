function normalizeObject (config) {
  // At this point we already processed String and Array config. Assuming object.
  return {
    id: config.id || config.name,
    options: config.options || {},
    ...config
  }
}