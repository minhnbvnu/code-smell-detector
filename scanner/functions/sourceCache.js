function sourceCache(loadSource) {
  const cache = new WeakMap();
  return (source, name) => {
    if (!source || typeof source !== "object") throw new Error("invalid data source");
    let promise = cache.get(source);
    if (!promise || (isDataArray(source) && source.length !== promise._numRows)) {
      // Warning: do not await here! We need to populate the cache synchronously.
      promise = loadSource(source, name);
      promise._numRows = source.length; // This will be undefined for DatabaseClients
      cache.set(source, promise);
    }
    return promise;
  };
}