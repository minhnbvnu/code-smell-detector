function loadPlugin(pluginName, { reporter, config, inputSrc, fileName }) {
  let plugins
  try {
    plugins = require(`solhint-plugin-${pluginName}`)
  } catch (e) {
    console.error(
      chalk.red(
        `[solhint] Error: Could not load solhint-plugin-${pluginName}, make sure it's installed.`
      )
    )
    process.exit(1)
  }

  if (!Array.isArray(plugins)) {
    console.warn(
      chalk.yellow(
        `[solhint] Warning: Plugin solhint-plugin-${pluginName} doesn't export an array of rules. Ignoring it.`
      )
    )
    return []
  }

  return plugins
    .map((Plugin) => new Plugin(reporter, config, inputSrc, fileName))
    .map((plugin) => {
      plugin.ruleId = `${pluginName}/${plugin.ruleId}`
      return plugin
    })
}