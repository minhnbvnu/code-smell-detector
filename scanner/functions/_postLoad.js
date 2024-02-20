function _postLoad(agent, nodule, name, resolvedName, esmResolver) {
  const instrumentation = shimmer.getInstrumentationNameFromModuleName(name)
  const registeredInstrumentation = shimmer.registeredInstrumentations[instrumentation]
  const hasPostLoadInstrumentation =
    registeredInstrumentation &&
    registeredInstrumentation.length &&
    registeredInstrumentation.filter((hook) => hook.onRequire).length

  // Check if this is a known instrumentation and then run it.
  if (hasPostLoadInstrumentation) {
    // Add the basedir to the instrumentation to be used later to parse version from package.json
    registeredInstrumentation.basedir = resolvedName
    logger.trace('Instrumenting %s with onRequire (module loaded) hook.', name)
    return instrumentPostLoad(agent, nodule, instrumentation, resolvedName, esmResolver)
  }

  return nodule
}