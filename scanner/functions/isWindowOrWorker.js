function isWindowOrWorker() {
  return (
    (
      typeof WorkerGlobalScope !== 'undefined'
            && self instanceof WorkerGlobalScope // eslint-disable-line no-restricted-globals
    )
        || (
          typeof module === 'undefined'
            || typeof window !== 'undefined'
        )
  );
}