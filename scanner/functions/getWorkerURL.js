function getWorkerURL(worker, options = {}) {
    const workerOptions = options[worker.id] || {};
    const workerFile = `${worker.id}-worker.js`;
    let url = workerOptions.workerUrl;
    if (!url && worker.id === "compression") {
      url = options.workerUrl;
    }
    if (options._workerType === "test") {
      url = `modules/${worker.module}/dist/${workerFile}`;
    }
    if (!url) {
      let version = worker.version;
      if (version === "latest") {
        version = NPM_TAG;
      }
      const versionTag = version ? `@${version}` : "";
      url = `https://unpkg.com/@loaders.gl/${worker.module}${versionTag}/dist/${workerFile}`;
    }
    assert3(url);
    return url;
  }