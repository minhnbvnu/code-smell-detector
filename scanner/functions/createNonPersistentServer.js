function createNonPersistentServer(options) {
  Activity.disable();
  // Don't start the filewatcher or the cache.
  if (options.nonPersistent == null) {
    options.nonPersistent = true;
  }

  return createServer(options);
}