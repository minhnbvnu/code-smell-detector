function registerInternalSendCommand(shim, proto) {
  shim.recordOperation(
    proto,
    'internal_send_command',
    function wrapInternalSendCommand(shim, _, __, args) {
      const commandObject = args[0]
      const keys = commandObject.args
      const parameters = getInstanceParameters(shim, this)

      parameters.key = stringifyKeys(shim, keys)

      return {
        name: commandObject.command || 'other',
        parameters,
        callback: function bindCallback(shim, _f, _n, segment) {
          if (shim.isFunction(commandObject.callback)) {
            shim.bindCallbackSegment(commandObject, 'callback', segment)
          } else {
            const self = this
            commandObject.callback = shim.bindSegment(
              function NRCallback(err) {
                if (err && self.emit instanceof Function) {
                  self.emit('error', err)
                }
              },
              segment,
              true
            )
          }
        }
      }
    }
  )
}