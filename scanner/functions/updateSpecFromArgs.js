function updateSpecFromArgs({ shim, fn, fnName, args, spec }) {
  let msgDesc = null
  if (shim.isFunction(spec)) {
    msgDesc = spec.call(this, shim, fn, fnName, args)
    msgDesc = new specs.MessageSpec(msgDesc)
  } else {
    msgDesc = new specs.MessageSpec(spec)
    const destIdx = shim.normalizeIndex(args.length, spec.destinationName)
    if (destIdx !== null) {
      msgDesc.destinationName = args[destIdx]
    }
  }

  return msgDesc
}