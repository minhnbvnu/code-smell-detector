function setLibrary(library) {
  this._metrics = {
    PREFIX: 'MessageBroker/',
    LIBRARY: library,
    PRODUCE: 'Produce/',
    CONSUME: 'Consume/',
    PURGE: 'Purge/',
    NAMED: 'Named/',
    TEMP: 'Temp'
  }

  if (LIBRARY_TRANSPORT_TYPES[library]) {
    this._transportType = LIBRARY_TRANSPORT_TYPES[library]
  }

  this._logger = this._logger.child({ library: library })
  this.logger.trace({ metrics: this._metrics }, 'Library metric names set')
}