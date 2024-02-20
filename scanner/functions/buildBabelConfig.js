function buildBabelConfig(filename, options) {
  const babelRC = getBabelRC(options.projectRoots);

  const extraConfig = {
    filename,
    sourceFileName: filename,
  };

  let config = Object.assign({}, babelRC, extraConfig);

  // Add extra plugins
  const extraPlugins = [externalHelpersPlugin];

  var inlineRequires = options.inlineRequires;
  var blacklist = inlineRequires && inlineRequires.blacklist;
  if (inlineRequires && !(blacklist && filename in blacklist)) {
    extraPlugins.push(inlineRequiresPlugin);
  }

  config.plugins = extraPlugins.concat(config.plugins);

  if (options.hot) {
    const hmrConfig = makeHMRConfig(options, filename);
    config = Object.assign({}, config, hmrConfig);
  }

  return Object.assign({}, babelRC, config);
}