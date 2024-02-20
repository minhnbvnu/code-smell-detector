function getParserClass(pluginsFromOptions) {
  const pluginList = mixinPluginNames.filter(name => hasPlugin(pluginsFromOptions, name));
  const key = pluginList.join("/");
  let cls = parserClassCache[key];

  if (!cls) {
    cls = Parser;

    for (const plugin of pluginList) {
      cls = mixinPlugins[plugin](cls);
    }

    parserClassCache[key] = cls;
  }

  return cls;
}