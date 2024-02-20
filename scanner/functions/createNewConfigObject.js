function createNewConfigObject(config) {
  config = new Config(Object.create(null))
  if (config.newrelic_home) {
    delete config.newrelic_home
  }
  return config
}