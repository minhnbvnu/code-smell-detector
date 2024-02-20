async function parseWithWorker(loader, data, options, context, parseOnMainThread) {
    const name8 = loader.id;
    const url = getWorkerURL(loader, options);
    const workerFarm = WorkerFarm.getWorkerFarm(options);
    const workerPool = workerFarm.getWorkerPool({ name: name8, url });
    options = JSON.parse(JSON.stringify(options));
    const job = await workerPool.startJob("process-on-worker", onMessage.bind(null, parseOnMainThread));
    job.postMessage("process", {
      input: data,
      options
    });
    const result = await job.result;
    return await result.result;
  }