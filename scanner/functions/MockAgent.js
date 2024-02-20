function MockAgent(config = {}) {
    EventEmitter.call(this)
    this.config = config
    this.config.app_name = 'Unit Test App'
    this.metrics = metricsMock
  }