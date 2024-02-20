function registerSendCommand(shim, proto) {
  shim.recordOperation(proto, 'send_command', function wrapSendCommand(shim, _, __, args) {
    const [command, keys] = args
    const parameters = getInstanceParameters(shim, this)

    parameters.key = stringifyKeys(shim, keys)

    return {
      name: command || 'other',
      parameters,
      callback: function bindCallback(shim, _f, _n, segment) {
        const last = args[args.length - 1]
        if (shim.isFunction(last)) {
          shim.bindCallbackSegment(args, shim.LAST, segment)
        } else if (shim.isArray(last) && shim.isFunction(last[last.length - 1])) {
          shim.bindCallbackSegment(last, shim.LAST, segment)
        }
      }
    }
  })
}