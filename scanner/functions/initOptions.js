function initOptions(config) {
  const options = config.options || (config.options = {});

  options.plugins = valueOrDefault(options.plugins, {});
  options.scales = mergeScaleConfig(config, options);
}