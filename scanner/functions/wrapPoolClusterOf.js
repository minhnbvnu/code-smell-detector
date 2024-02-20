function wrapPoolClusterOf(shim, of, _n, poolNamespace) {
      if (poolNamespace[symbols.clusterOf]) {
        return
      }

      if (wrapGetConnection(shim, poolNamespace) && wrapQueryable(shim, poolNamespace, false)) {
        poolNamespace[symbols.clusterOf] = true
      }
    }