function parseOptions(options = {}, startFunction) {
  if (typeof options === 'function') {
    return { worker: options }
  }
  if (typeof options === 'number') {
    return { count: options, worker: startFunction }
  }
  return {
    master: options.master,
    worker: options.worker || options.start,
    count: options.count !== undefined ? options.count : options.workers,
    lifetime: options.lifetime,
    grace: options.grace,
    signals: options.signals,
  }
}