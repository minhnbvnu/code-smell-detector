function setFramework(framework) {
  this._metrics = {
    PREFIX: framework + '/',
    FRAMEWORK: framework,
    MIDDLEWARE: metrics.MIDDLEWARE.PREFIX
  }
  this.agent.environment.setFramework(framework)

  this._logger = this._logger.child({ framework: framework })
  this.logger.trace({ metrics: this._metrics }, 'Framework metric names set')
}