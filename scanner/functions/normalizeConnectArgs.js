function normalizeConnectArgs(args) {
  let options = Object.create(null)

  function toNumber(x) {
    return (x = Number(x)) >= 0 ? x : false
  }
  if (typeof args[0] === 'object' && args[0] !== null) {
    // connect(options, [cb])
    options = args[0]
  } else if (typeof args[0] === 'string' && toNumber(args[0]) === false) {
    // connect(path, [cb]);
    options.path = args[0]
  } else {
    // connect(port, [host], [cb])
    options.port = args[0]
    if (typeof args[1] === 'string') {
      options.host = args[1]
    }
  }

  const cb = args[args.length - 1]
  return typeof cb === 'function' ? [options, cb] : [options]
}