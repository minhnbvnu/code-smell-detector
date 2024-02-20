function updateWorkerXVIZVersion() {
  Object.keys(workerFarm).forEach(id => {
    if (workerFarm[id]) {
      const xvizConfig = {...getXVIZConfig()};
      delete xvizConfig.preProcessPrimitive;

      workerFarm[id].broadcast({xvizConfig});
    }
  });
}