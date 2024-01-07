function pluginOpts(config, {plugin, local}, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  if (local && plugin.defaults) {
    // make sure plugin defaults are in scopes for local (not registered) plugins
    scopes.push(plugin.defaults);
  }
  return config.createResolver(scopes, context, [''], {
    // These are just defaults that plugins can override
    scriptable: false,
    indexable: false,
    allKeys: true
  });
}