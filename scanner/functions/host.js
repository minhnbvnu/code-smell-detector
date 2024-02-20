async function host(argv, args) {
  try {
    const configPath = join(argv.project, "clio.toml");

    await build(configPath, {
      skipBundle: true,
      silent: argv.silent,
      clean: argv.clean,
    });

    const config = getPackageConfig(configPath);
    const target = getBuildTarget(configPath, config); // No target override
    const destination = getDestinationFromConfig(configPath, config);
    const platform = getPlatform(target);

    return await platform.host(destination, args);
  } catch (e) {
    error(e);
  }
}