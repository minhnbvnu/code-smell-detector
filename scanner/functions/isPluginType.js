function isPluginType(plugin, constructorName) {
  return plugin.constructor && plugin.constructor.name === constructorName;
}