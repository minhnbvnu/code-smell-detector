function parseEtlStream(data, opts = {}) {
  // Callbacks to enable instrumentation
  const {onData = noop, onDone = noop} = opts;
  const context = onData(opts) || opts.context;

  const stream = parseXVIZStream(data, opts.convertPrimitive);

  onDone({...opts, context});
  return stream;
}