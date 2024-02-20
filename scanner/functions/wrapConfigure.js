function wrapConfigure({ shim, winstonLogger, agent }) {
  shim.wrap(winstonLogger, 'configure', function nrConfigure(shim, configure) {
    return function wrappedConfigure() {
      const args = shim.argsToArray.apply(shim, arguments)
      const transportsArg = args?.[0]?.transports
      if (this.transports.length) {
        const nrTransport = new NrTransport({ agent })
        args[0].transports = Array.isArray(transportsArg)
          ? [...transportsArg, nrTransport]
          : nrTransport
      }
      return configure.apply(this, args)
    }
  })
}