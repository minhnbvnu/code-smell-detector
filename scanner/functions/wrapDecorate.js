function wrapDecorate(shim, decorate) {
  return function wrappedDecorate(type, name, handler) {
    if (type !== 'toolkit' || name !== 'view') {
      return decorate.apply(this, arguments)
    }

    const args = shim.argsToArray.apply(shim, arguments)
    args[2] = shim.recordRender(handler, { promise: true })

    return decorate.apply(this, args)
  }
}