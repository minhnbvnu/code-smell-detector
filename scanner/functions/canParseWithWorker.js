function canParseWithWorker(loader, options) {
    if (!WorkerFarm.isSupported()) {
      return false;
    }
    return loader.worker && options?.worker;
  }