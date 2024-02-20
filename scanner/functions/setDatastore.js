function setDatastore(datastore) {
  this._metrics = {
    PREFIX: datastore,
    STATEMENT: metrics.DB.STATEMENT + '/' + datastore + '/',
    OPERATION: metrics.DB.OPERATION + '/' + datastore + '/',
    INSTANCE: metrics.DB.INSTANCE + '/' + datastore + '/',
    ALL: metrics.DB.PREFIX + datastore + '/' + metrics.ALL
  }

  this._datastore = datastore

  this._logger = this._logger.child({ datastore: this._metrics.PREFIX })
  this.logger.trace({ metrics: this._metrics }, 'Datastore metric names set')
}