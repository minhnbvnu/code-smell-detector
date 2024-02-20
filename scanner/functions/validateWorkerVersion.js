function validateWorkerVersion(worker, coreVersion = VERSION) {
    assert3(worker, "no worker provided");
    const workerVersion = worker.version;
    if (!coreVersion || !workerVersion) {
      return false;
    }
    return true;
  }