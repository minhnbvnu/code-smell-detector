function instrumentedHandler(stream) {
      const { transaction, segment } = createTransaction()
      acceptDTHeaders(stream, transaction)
      if (semver.gte(shim.pkgVersion, '1.10.0')) {
        instrumentInterceptors(stream, transaction)
      } else {
        instrumentEventListeners(stream, transaction)
      }
      return shim.applySegment(handler, segment, true, this, arguments)
    }