function instrumentPostLoad(agent, nodule, moduleName, resolvedName, esmResolver) {
  // default to Node.js version, this occurs for core libraries
  const pkgVersion = resolvedName ? shimmer.getPackageVersion(moduleName) : process.version
  const instrumentations = shimmer.registeredInstrumentations[moduleName]
  instrumentations.forEach((instrumentation) => {
    const isInstrumented = instrumentation[symbols.instrumented].has(pkgVersion)
    const failedInstrumentation = instrumentation[symbols.instrumentedErrored].has(pkgVersion)
    if (isInstrumented || failedInstrumentation) {
      const msg = isInstrumented ? 'Already instrumented' : 'Failed to instrument'
      logger.trace(`${msg} ${moduleName}@${pkgVersion}, skipping registering instrumentation`)
      return
    }

    const resolvedNodule = resolveNodule({ nodule, instrumentation, esmResolver })
    const shim = shims.createShimFromType({
      type: instrumentation.type,
      agent,
      moduleName,
      resolvedName,
      shimName: instrumentation.shimName,
      pkgVersion
    })

    applyDebugState(shim, resolvedNodule, esmResolver)
    trackInstrumentationUsage(
      agent,
      shim,
      instrumentation.specifier || moduleName,
      NAMES.FEATURES.INSTRUMENTATION.ON_REQUIRE
    )

    // Tracking instrumentation is only used to add the supportability metrics
    // that occur directly above this.  No reason to attempt to load instrumentation
    // as it does not exist.
    if (instrumentation.type === MODULE_TYPE.TRACKING) {
      instrumentation[symbols.instrumented].add(pkgVersion)
      return
    }

    nodule = loadInstrumentation({
      shim,
      resolvedNodule,
      pkgVersion,
      moduleName,
      nodule,
      instrumentation
    })
  })

  return nodule
}