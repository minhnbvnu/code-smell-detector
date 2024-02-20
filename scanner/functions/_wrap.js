function _wrap(shim, original, name, spec, args) {
  // Assemble the spec's arguments.
  const specArgs = [shim, original, name]
  if (args && args.length) {
    specArgs.push.apply(specArgs, args)
  }

  // Apply the spec and see if it returned a wrapped version of the property.
  let wrapped = spec.wrapper.apply(null, specArgs)
  if (wrapped && wrapped !== original) {
    if (spec.matchArity && shim.isFunction(wrapped)) {
      wrapped = arity.fixArity(original, wrapped)
    }

    shim.assignOriginal(wrapped, original)

    if (shim._debug) {
      shim._wrapped.push(wrapped)
    }
  } else {
    wrapped = original
  }
  return wrapped
}