function applyInstrumentation(objectName, object, meta) {
    const { methods, options } = meta
    if (options.callback) {
      methods.forEach((method) => {
        const { isQuery, makeDescFunc } = recordDesc[objectName]
        const proto = object.prototype
        if (isQuery) {
          shim.recordQuery(proto, method, makeDescFunc(shim, method))
        } else if (isQuery === false) {
          // could be unset
          shim.recordOperation(proto, method, makeDescFunc(shim, method))
        } else {
          shim.logger.trace('No wrapping method found for %s', objectName)
        }
      })
    }

    // the cursor object implements Readable stream and internally calls nextObject on
    // each read, in which case we do not want to record each nextObject() call
    if (/Cursor$/.test(objectName)) {
      shim.recordOperation(object.prototype, 'pipe')
    }
  }