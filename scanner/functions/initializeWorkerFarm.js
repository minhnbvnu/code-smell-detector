function initializeWorkerFarm({
  worker,
  maxConcurrency = 4,
  capacity = null,
  id = 'default'
}) {
  if (!workerFarm[id]) {
    const xvizConfig = {...getXVIZConfig()};
    delete xvizConfig.preProcessPrimitive;
    let workerURL;

    if (typeof worker === 'string') {
      // worker is an URL
      workerURL = worker;
    } else {
      // use default worker
      const blob = new Blob([streamDataWorker], {type: 'application/javascript'});
      workerURL = URL.createObjectURL(blob);
    }

    workerFarm[id] = new WorkerFarm({
      id,
      workerURL,
      maxConcurrency,
      capacity,
      initialMessage: {xvizConfig}
    });
  }
}