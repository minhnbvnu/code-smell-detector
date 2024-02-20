function hasPlugin(plugins, name) {
  return plugins.some(plugin => {
    if (Array.isArray(plugin)) {
      return plugin[0] === name;
    } else {
      return plugin === name;
    }
  });
}