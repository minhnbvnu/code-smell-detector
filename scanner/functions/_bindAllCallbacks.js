function _bindAllCallbacks(shim, fn, name, args, spec) {
  // Check for a normal callback.
  if (spec?.spec?.callback !== null) {
    _bindCallback({
      context: this,
      callback: spec.spec.callback,
      binder: shim.bindCallbackSegment,
      shim,
      fn,
      args,
      spec,
      name
    })
  }

  // And check for a row callback.
  if (spec?.spec?.rowCallback !== null) {
    _bindCallback({
      context: this,
      callback: spec.spec.rowCallback,
      binder: shim.bindRowCallbackSegment || shim.bindCallbackSegment,
      shim,
      fn,
      args,
      spec,
      name
    })
  }
}