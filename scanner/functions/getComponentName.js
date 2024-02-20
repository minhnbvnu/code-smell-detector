function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}