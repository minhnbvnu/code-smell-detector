function instrumentPGNative(pg) {
    shim.wrapReturn(pg, 'Client', clientFactoryWrapper)
    shim.wrapClass(pg, 'Pool', { post: poolPostConstructor, es6: true })
  }