function initializeWorkers({id, worker, maxConcurrency = 4, capacity = null}) {
  initializeWorkerFarm({id, worker, maxConcurrency, capacity});
}