function destroyWorkerFarm() {
  Object.keys(workerFarm).forEach(id => {
    if (workerFarm[id]) {
      workerFarm[id].destroy();
      delete workerFarm[id];
    }
  });
}