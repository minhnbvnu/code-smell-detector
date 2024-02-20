function getLoadableWorkerURL(props) {
    assert3(props.source && !props.url || !props.source && props.url);
    let workerURL = workerURLCache.get(props.source || props.url);
    if (!workerURL) {
      if (props.url) {
        workerURL = getLoadableWorkerURLFromURL(props.url);
        workerURLCache.set(props.url, workerURL);
      }
      if (props.source) {
        workerURL = getLoadableWorkerURLFromSource(props.source);
        workerURLCache.set(props.source, workerURL);
      }
    }
    assert3(workerURL);
    return workerURL;
  }