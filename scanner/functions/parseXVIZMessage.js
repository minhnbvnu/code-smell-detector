function parseXVIZMessage({
  message,
  // callbacks
  onResult,
  onError,
  debug,
  // worker options
  worker = false,
  workerId = 'default',
  maxConcurrency = 4,
  capacity = null,
  opts = {}
}) {
  if (worker) {
    const id = workerId;
    if (!getWorkerFarm(id)) {
      initializeWorkers({id, worker, maxConcurrency, capacity});
    }

    const workerFarm = getWorkerFarm(id);

    if (debug) {
      workerFarm.debug = debug;
    }

    const onMessage = data => onResult(postDeserialize(data));
    workerFarm.process({data: message, opts}, onMessage, onError);
  } else {
    parseXVIZMessageSync(message, onResult, onError, opts);
  }
}