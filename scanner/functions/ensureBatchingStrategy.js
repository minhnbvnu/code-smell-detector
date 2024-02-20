function ensureBatchingStrategy() {
  ("production" !== "development" ? invariant(batchingStrategy, 'ReactUpdates: must inject a batching strategy') : invariant(batchingStrategy));
}