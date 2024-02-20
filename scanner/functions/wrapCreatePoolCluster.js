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