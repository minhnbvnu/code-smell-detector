function loadInstrumentation({
  shim,
  resolvedNodule,
  pkgVersion,
  moduleName,
  nodule,
  instrumentation
}) {
  try {
    if (instrumentation.onRequire(shim, resolvedNodule, moduleName) !== false) {
      nodule = shim.getExport(nodule)
      instrumentation[symbols.instrumented].add(pkgVersion)
    }
  } catch (instrumentationError) {
    instrumentation[symbols.instrumentedErrored].add(pkgVersion)
    if (instrumentation.onError) {
      try {
        instrumentation.onError(instrumentationError)
      } catch (e) {
        logger.warn(
          e,
          instrumentationError,
          'Custom instrumentation for %s failed, then the onError handler threw an error',
          moduleName
        )
      }
    } else {
      logger.warn(
        instrumentationError,
        'Custom instrumentation for %s failed. Please report this to the ' +
          'maintainers of the custom instrumentation.',
        moduleName
      )
    }
  }

  return nodule
}