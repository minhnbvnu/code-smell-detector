function getLoadableWorkerURLFromSource(workerSource) {
    const blob = new Blob([workerSource], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }