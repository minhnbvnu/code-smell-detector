function poolPostConstructor(shim) {
    if (!shim.isWrapped(this.Client)) {
      shim.wrapClass(this, 'Client', clientPostConstructor)
    }
  }