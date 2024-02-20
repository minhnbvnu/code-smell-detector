function callbackInitialize(shim, mysql) {
  shim.setDatastore(shim.MYSQL)
  shim[symbols.wrappedPoolConnection] = false

  shim.wrapReturn(mysql, 'createConnection', wrapCreateConnection)
  function wrapCreateConnection(shim, fn, fnName, connection) {
    if (shim[symbols.unwrapConnection]) {
      return
    }
    shim.logger.debug('Wrapping Connection#query')
    if (wrapQueryable(shim, connection, false)) {
      const connProto = Object.getPrototypeOf(connection)
      connProto[symbols.storeDatabase] = true
      shim[symbols.unwrapConnection] = true
    }
  }

  shim.wrapReturn(mysql, 'createPool', wrapCreatePool)
  function wrapCreatePool(shim, fn, fnName, pool) {
    if (shim[symbols.unwrapPool]) {
      return
    }
    shim.logger.debug('Wrapping Pool#query and Pool#getConnection')
    if (wrapQueryable(shim, pool, true) && wrapGetConnection(shim, pool)) {
      shim[symbols.unwrapPool] = true
    }
  }

  shim.wrapReturn(mysql, 'createPoolCluster', wrapCreatePoolCluster)
  function wrapCreatePoolCluster(shim, fn, fnName, poolCluster) {
    if (shim[symbols.createPoolCluster]) {
      return
    }
    shim.logger.debug('Wrapping PoolCluster#of')
    const proto = Object.getPrototypeOf(poolCluster)
    shim.wrapReturn(proto, 'of', wrapPoolClusterOf)
    function wrapPoolClusterOf(shim, of, _n, poolNamespace) {
      if (poolNamespace[symbols.clusterOf]) {
        return
      }

      if (wrapGetConnection(shim, poolNamespace) && wrapQueryable(shim, poolNamespace, false)) {
        poolNamespace[symbols.clusterOf] = true
      }
    }

    shim.logger.debug('Wrapping PoolCluster#getConnection')
    if (wrapGetConnection(shim, poolCluster)) {
      shim[symbols.createPoolCluster] = true
    }
  }
}