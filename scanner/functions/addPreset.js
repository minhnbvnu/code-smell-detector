async function addPreset(name) {
  /** @type {{default: Preset}} */
  const mod = await import(new URL(name + '/index.js', packagesUrl).href)
  const plugins = mod.default.plugins
  assert(plugins, 'expected plugins in preset')
  /** @type {PresetInfo} */
  const presetInfo = {name, plugins: []}

  let index = -1

  while (++index < plugins.length) {
    const plugin = plugins[index]
    /** @type {import('unified').Plugin<[unknown]>} */
    let fn
    /** @type {unknown} */
    let option

    if (Array.isArray(plugin)) {
      ;[fn, option] = /** @type {import('unified').PluginTuple<[unknown]>} */ (
        plugin
      )
    } else {
      assert(typeof plugin === 'function')
      fn = plugin
    }

    // @ts-expect-error: `displayName`s are fine.
    const name = /** @type {string} */ (fn.displayName || fn.name)

    const pluginName = name
      .replace(
        /[:-](\w)/g,
        function (/** @type {string} */ _, /** @type {string} */ $1) {
          return $1.toUpperCase()
        }
      )
      .replace(/[A-Z]/g, function (/** @type {string} */ $0) {
        return '-' + $0.toLowerCase()
      })

    presetInfo.plugins.push([pluginName, option])
  }

  presets.push(presetInfo)
}