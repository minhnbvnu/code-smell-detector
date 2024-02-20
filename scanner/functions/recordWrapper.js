function recordWrapper({ shim, fn, name, recordNamer }) {
  return function wrapper() {
    // Create the segment that will be recorded.
    const args = argsToArray.apply(shim, arguments)
    let segDesc = recordNamer.call(this, shim, fn, name, args)
    if (!segDesc) {
      shim.logger.trace('No segment descriptor for "%s", not recording.', name)
      return fnApply.call(fn, this, args)
    }
    segDesc = new specs.RecorderSpec(segDesc)

    // See if we're in an active transaction.
    let parent
    if (segDesc.parent) {
      // We only want to continue recording in a transaction if the
      // transaction is active.
      parent = segDesc.parent.transaction.isActive() ? segDesc.parent : null
    } else {
      parent = shim.getActiveSegment()
    }

    if (!parent) {
      shim.logger.debug('Not recording function %s, not in a transaction.', name)
      return fnApply.call(fn, this, arguments)
    }

    if (segDesc.callbackRequired && !_hasValidCallbackArg(shim, args, segDesc.callback)) {
      return fnApply.call(fn, this, arguments)
    }

    // Only create a segment if:
    //  - We are _not_ making an internal segment.
    //  - OR the parent segment is either not internal or not from this shim.
    const shouldCreateSegment = !(
      parent.opaque ||
      (segDesc.internal && parent.internal && shim === parent.shim)
    )

    const segment = shouldCreateSegment ? _rawCreateSegment(shim, segDesc) : parent
    maybeAddCLMAttributes(fn, segment)

    return _doRecord.call(this, { segment, args, segDesc, shouldCreateSegment, shim, fn, name })
  }
}