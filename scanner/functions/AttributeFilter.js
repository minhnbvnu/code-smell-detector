function AttributeFilter(config) {
  this.config = config
  this._rules = Object.create(null)
  this._cache = Object.create(null)
  this._cachedCount = 0
  this._enabledDestinations = DESTINATIONS.NONE

  const updater = this.update.bind(this)

  // Add the global rules.
  config.on('attributes.enabled', updater)
  config.on('attributes.include', updater)
  config.on('attributes.exclude', updater)
  this._rules.global = Object.create(null)

  // And all the destination rules.
  DESTINATION_DETAILS.forEach(function forEachDestination(dest) {
    config.on(dest.name + '.attributes.enabled', updater)
    config.on(dest.name + '.attributes.include', updater)
    config.on(dest.name + '.attributes.exclude', updater)
    this._rules[dest.name] = Object.create(null)
  }, this)

  // Now pull in all the rules.
  this.update()
}