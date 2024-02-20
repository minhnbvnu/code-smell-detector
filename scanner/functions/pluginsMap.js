function pluginsMap(plugins) {
  const pluginMap = new Map();

  for (const plugin of plugins) {
    const [name, options] = Array.isArray(plugin) ? plugin : [plugin, {}];
    if (!pluginMap.has(name)) pluginMap.set(name, options || {});
  }

  return pluginMap;
}