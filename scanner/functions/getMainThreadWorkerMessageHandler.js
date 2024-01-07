function getMainThreadWorkerMessageHandler() {
    let mainWorkerMessageHandler;

    try {
      mainWorkerMessageHandler = globalThis.pdfjsWorker?.WorkerMessageHandler;
    } catch (ex) {}

    return mainWorkerMessageHandler || null;
  }