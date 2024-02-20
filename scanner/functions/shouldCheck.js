function shouldCheck(manifest, options) {
  return shouldCheckCpu(manifest.cpu, options.ignorePlatform) || shouldCheckPlatform(manifest.os, options.ignorePlatform) || shouldCheckEngines(manifest.engines, options.ignoreEngines);
}