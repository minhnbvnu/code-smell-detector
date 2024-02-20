function writePackageConfig(configPath, config) {
  const cfg = {};

  if (config.dependencies?.length) {
    cfg.dependencies = {};
    for (const dep of config.dependencies) {
      cfg.dependencies[dep.name] = dep.version;
    }
  }

  if (config.npm?.dependencies?.length) {
    cfg.npm = cfg.npm || {};
    cfg.npm.dependencies = {};
    for (const dep of config.npm.dependencies) {
      cfg.npm.dependencies[dep.name] = dep.version;
    }
  }

  if (config.npm?.devDependencies?.length) {
    cfg.npm = cfg.npm || {};
    cfg.npm.devDependencies = {};
    for (const dep of config.npm.devDependencies) {
      cfg.npm.devDependencies[dep.name] = dep.version;
    }
  }

  const cfgStr = stringify({
    ...removeKeys(config, "dependencies", "npmOverride"),
    ...cfg,
    npm: {
      ...config.npmOverride,
      ...cfg.npm,
    },
  });

  writeFileSync(configPath, cfgStr);
}