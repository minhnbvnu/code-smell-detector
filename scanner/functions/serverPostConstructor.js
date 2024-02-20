function serverPostConstructor(shim) {
  const proto = Object.getPrototypeOf(this)

  if (shim.isWrapped(proto.decorate)) {
    shim.logger.trace('Already wrapped Server proto, not wrapping again')
    return
  }

  wrapProtoDecorate(shim, proto)
  wrapProtoRoute(shim, proto)
  wrapProtoExt(shim, proto)
}