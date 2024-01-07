function createDescriptors(chart, {plugins, localIds}, options, all) {
  const result = [];
  const context = chart.getContext();

  for (const plugin of plugins) {
    const id = plugin.id;
    const opts = getOpts(options[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart.config, {plugin, local: localIds[id]}, opts, context)
    });
  }

  return result;
}