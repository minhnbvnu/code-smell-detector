function getLoadableWorkerURLFromURL(url) {
    if (!url.startsWith("http")) {
      return url;
    }
    const workerSource = buildScriptSource(url);
    return getLoadableWorkerURLFromSource(workerSource);
  }