function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }