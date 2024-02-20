function recordRender(nodule, properties, spec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // recordRender(func, spec)
    spec = properties
    properties = null
  }

  spec = this.setDefaults(
    spec,
    new specs.RenderSpec({
      view: this.FIRST,
      callback: null,
      promise: null
    })
  )

  return this.record(nodule, properties, function renderRecorder(shim, fn, name, args) {
    const viewIdx = shim.normalizeIndex(args.length, spec.view)
    if (viewIdx === null) {
      shim.logger.debug('Invalid spec.view (%d vs %d), not recording.', spec.view, args.length)
      return null
    }

    return {
      name: metrics.VIEW.PREFIX + args[viewIdx] + metrics.VIEW.RENDER,
      callback: spec.callback,
      promise: spec.promise,
      recorder: genericRecorder,

      // Hidden class stuff
      rowCallback: null,
      stream: null,
      internal: false
    }
  })
}