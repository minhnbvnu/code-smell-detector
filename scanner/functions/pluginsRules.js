function pluginsRules(configPlugins, meta) {
  const plugins = Array.isArray(configPlugins) ? configPlugins : [configPlugins]

  return _(plugins)
    .map((name) => loadPlugin(name, meta))
    .flatten()
    .value()
}